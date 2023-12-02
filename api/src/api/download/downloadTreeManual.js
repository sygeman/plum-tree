require('dotenv').config()
const AdmZip = require('adm-zip')
const aws = require('aws-sdk')
const log = require('../../helpers/log')
const { getTree, getTreePeople } = require('../../helpers/db')

const notFound = {
  statusCode: 404,
  body: JSON.stringify({
    errors: [{
      title: 'Not Found',
      detail: 'The tree does not exist.'
    }]
  })
}

const prepareDownload = async () => {
  try {
    const treeId = '611d3e54aab265bdbe9f76f5'
    const username = 'BabiSim'

    log.info({ username, treeId }, 'Getting tree data')
    const tree = await getTree(treeId, username)
    const people = await getTreePeople(treeId)

    if (!tree) {
      log.info({ username, treeId }, 'Tree not found')
      return notFound
    }

    log.info({ username, treeId }, 'Tree found and starting to build download')
    const zip = new AdmZip()

    // add static files
    zip.addLocalFile('./src/download/55f86e404c6510403986.317.js')
    zip.addLocalFile('./src/download/55f86e404c6510403986.main.css')
    zip.addLocalFile('./src/download/55f86e404c6510403986.main.js')
    zip.addLocalFile('./src/download/79b86a4012d91b58d24d.woff')
    zip.addLocalFile('./src/download/662d4bc3097ab79ca543.jpg')
    zip.addLocalFile('./src/download/834e711fea0da201416e.svg')
    zip.addLocalFile('./src/download/tree.html')

    log.info('Static files added to download')

    // add data files
    const treeJson = `var tree=${JSON.stringify(tree)}`
    const peopleJson = `var people=${JSON.stringify(people)}`
    zip.addFile('data/tree.js', Buffer.from(treeJson, 'utf8'), 'tree JSON data')
    zip.addFile('data/people.js', Buffer.from(peopleJson, 'utf8'), 'people JSON data')

    log.info('Data files added to download')

    // add images
    const s3 = new aws.S3({ apiVersion: '2006-03-01' })
    const peopleAvatars = people.filter(p => p.avatar)
      .map(p => p.avatar)
      .slice(2000, 4000)

    const totalPeople = peopleAvatars.length
    let processedPeople = 0
    await Promise.all(peopleAvatars.map(avatar => {
      return s3.getObject({
        Bucket: 'com.theplumtreeapp.upload-processed',
        Key: avatar
      }).promise()
        .then(data => {
          const imageTmp = avatar.split('/').pop()
          zip.addFile(`images/avatar/${imageTmp}`, data.Body)
        })
        .catch(err => {
          if (err.name === 'NoSuchKey') {
            // could not find avatar image in bucket, this is fine just ignore.
            log.warn({ err, avatar }, 'Ignoring missing person avatar')
            return
          }
          log.warn({ err, avatar }, 'Failed to get person avatar')
        })
        .finally(() => {
          processedPeople++
          log.info(`${processedPeople} / ${totalPeople} people processed`)
        })
    }))

    log.info('People image files added to download')

    if (tree.cover) {
      await s3.getObject({
        Bucket: 'com.theplumtreeapp.upload-processed',
        Key: tree.cover
      }).promise()
        .then(data => {
          const imageTmp = tree.cover.split('/').pop()
          zip.addFile(`images/cover/${imageTmp}`, data.Body)
        })
        .catch(err => {
          if (err.name === 'NoSuchKey') {
            // could not find cover image in bucket, this is fine just ignore.
            log.warn({ err, cover: tree.cover }, 'Ignoring missing tree cover')
            return
          }
          log.warn({ err, cover: tree.cover }, 'Failed to get tree cover')
        })
    }

    log.info('Cover image added to download')

    // Upload to S3 as Lambda response size is limited which is an issue for
    // larger trees
    // await s3.putObject({
    //   Bucket: 'com.theplumtreeapp.upload-input',
    //   Key: `downloads/${treeId}.zip`,
    //   Body: zip.toBuffer(),
    //   Tagging: 'temp=true'
    // }).promise()

    zip.writeZip(`downloads/${treeId}.zip`)

    log.info({ file: `downloads/${treeId}.zip` }, 'Download uploaded to S3')

    // const downloadURL = s3.getSignedUrl('getObject', {
    //   Bucket: 'com.theplumtreeapp.upload-input',
    //   Key: `downloads/${treeId}.zip`
    // })

    // log.info({ file: `downloads/${treeId}.zip` }, 'Signed URL generated')

    return {
      statusCode: 200,
      isBase64Encoded: false,
      body: JSON.stringify({
        // downloadURL,
        filename: `downloads/${treeId}.zip`
      })
    }
  } catch (err) {
    log.error({ err }, 'Failed to get tree')

    return {
      statusCode: 500,
      body: JSON.stringify({
        errors: [{
          title: 'Internal Error',
          detail: 'Something went wrong, please try again later.'
        }]
      })
    }
  }
}

prepareDownload()
