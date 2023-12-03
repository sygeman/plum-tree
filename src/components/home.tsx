import { Link } from "react-router-dom";
// import styles from "./styles.scss";
import plumbob from "../assets/plumbob.png";
import thumbsup from "../assets/thumbsup.png";

// .sunsetAlert {
//   display: block;
//   color: #fff;
//   background-color: #ff7f48;
//   padding: 15px;
//   margin: 0px -40px;
//   margin-top: -20px;
// }

// .homeBannerImage {
//   background: url(./tree.png) center center no-repeat;
//   background-size: cover;
//   height: 250px;
// }

// .homeBannerMask {
//   position: absolute;
//   left: 0px;
//   top: 0px;
//   right: 0px;
//   height: 250px;
// }

// .introPanel {
//   margin: -90px auto 20px;
//   width: 80%;
//   max-width: 600px;
//   padding: 20px 40px;
//   background: #fff;
//   border-radius: 5px;
//   box-shadow: 0 1px 4px 0 rgba(0,0,0,.1);
//   overflow: hidden;
// }

// .featureImage {
//   display: block;
//   margin: 0px auto;
// }

// .galleryImage {
//   display: block;
//   box-shadow: 0 0 10px rgba(0,0,0,.5);
//   border: 7px solid #fff;
//   background-size: cover;
//   background-position: 50%;
//   height: 200px;
//   background-image: url(./browse.jpg);
// }

// .guidesImage {
//   display: block;
//   box-shadow: 0 0 10px rgba(0,0,0,.5);
//   border: 7px solid #fff;
//   background-size: cover;
//   background-position: 50%;
//   height: 200px;
//   background-image: url(./read.jpg);
// }

// .guideVideo {
//   text-align: center;
// }

export default () => {
  return (
    <div>
      <div className={"styles.homeBannerImage"} />
      <div className="container">
        <div className={"styles.introPanel"}>
          <p>Welcome to the plum tree app!</p>
          <p>Create dynamic family trees for your sims legacies.</p>
          <p>Then publish and share your trees for others to see.</p>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <img src={plumbob} className={"styles.featureImage"} width="100" />
            <p>
              Crafted with Sims in mind we allow to set traits, aspirations and
              other Sims specific details to really help convey your sims
              colourful lives.
            </p>
          </div>
          <div className="col-12 col-md-6">
            <img src={thumbsup} className={"styles.featureImage"} width="100" />
            <p>
              Built to be simple yet flexible so you can easily build and share
              your sims legacy.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <h2>Guides</h2>
            <Link className={"styles.guidesImage"} to="/guides" />
            <p>
              Get up to speed with how to use The Plum Tree with our guides.
            </p>
            <Link className="btn btn-primary" to="/guides">
              Read The Guides
            </Link>
          </div>

          <div className="col-12 col-md-6">
            <h2>Using The Plum Tree</h2>

            <div className={"styles.guideVideo"}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/QatRM3knISY"
                allowFullScreen
              />
            </div>

            <p>
              If our guides don't do it for you, check out{" "}
              <a
                href="https://www.youtube.com/channel/UCYorr-o7j29k9vF8xGiiCmA"
                target="_blank"
                rel="noopener noreferrer"
              >
                The SimTwins
              </a>{" "}
              video instead. We thank them for this brilliant guide they put
              together on how to build the perfect Sims 4 family tree.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
