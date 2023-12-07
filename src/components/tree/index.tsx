import { tree as d3Tree, hierarchy } from "d3-hierarchy";
import { select } from "d3-selection";
import { zoom as d3Zoom } from "d3-zoom";
import get from "lodash.get";
import { useEffect, useRef, useState } from "react";

import { CommonPatterns } from "./common-patterns";
import { TREE_DEPTH, TREE_TOP_PADDING } from "./constants";
import { Link } from "./link";
import { Node } from "./node";
import { PersonDetails } from "./person-details";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const Tree = ({ onChange, onEditNode, people = [], readonly, tree }) => {
  const [zoomInitialized, setZoomInitialized] = useState(false);
  const [links, setLinks] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [nodeToHighlight, setNodeToHighlight] = useState(null);
  const [nodePeopleToHighlight, setNodePeopleToHighlight] = useState([]);
  const [personDetails, setPersonDetails] = useState(null);
  const [parentType, setParentType] = useState("NONE");
  const [parents, setParents] = useState([]);
  const [adoptiveParents, setAdoptiveParents] = useState([]);

  const prevTree = usePrevious(tree);

  const svg = useRef(null);
  const zoom = useRef(null);

  useEffect(() => {
    setZoomInitialized(false);
  }, []);

  useEffect(() => {
    // when moving between trees the component will try and be smart and not
    // remove the Component from the DOM. This makes re-render faster but screws
    // up the zoom handler. So we need to re-init by setting zoomInitialized to
    // false
    if (get(tree, "_id") !== get(prevTree, "_id")) {
      setZoomInitialized(false);
    }
    if (tree && tree.data) {
      updateTreeState(tree.data);
    }
  }, [tree]);

  useEffect(() => {
    if (svg.current && !zoomInitialized) {
      initSVGZoom(svg.current);
    }
  }, [zoomInitialized, svg.current]);

  /**
   * Takes the tree data and generates the links and nodes data followed by
   * setting those in the component state. Called when new props for tree data
   * are received.
   * @param  {Object} tree The tree data
   * @return {void}
   */
  function updateTreeState(tree) {
    // setup tree data
    const root = hierarchy(tree);

    // declares a tree layout
    const treeMap = d3Tree()
      .nodeSize([200, 80])
      .separation((a, b) => (a.parent === b.parent ? 1 : 1.2));
    const treeData = treeMap(root);

    // compute the tree layout nodes and links
    const nodes = treeData.descendants();

    // overwrite the height increase for each node depth/generation
    nodes.forEach(function (d) {
      d.y = d.depth * TREE_DEPTH;
    });

    // get link data (from nodes minus the root node)
    const links = nodes.slice(1);

    // set state data for our tree to render
    setNodes(nodes);
    setLinks(links);
  }

  function initSVGZoom(svg) {
    // have to check both clientWidth and parentNode.clientWidth to fix FireFox
    // issue where clientWidth is 0
    const width = svg.clientWidth || svg.parentNode.clientWidth;

    const zoomInstance = d3Zoom().scaleExtent([0.1, 3]).on("zoom", zoomed);

    const selectionSvg = select("svg").call(zoomInstance);

    // move to initial position
    zoomInstance.translateBy(selectionSvg, width / 2, TREE_TOP_PADDING);

    setZoomInitialized(true);
  }

  function zoomed(event) {
    const zoomTransform = event.transform;
    zoom.current.setAttribute(
      "transform",
      `translate(${zoomTransform.x},${zoomTransform.y})scale(${zoomTransform.k})`
    );
  }

  function showPersonDetails(
    personId,
    parentType = "NONE",
    parentIds = [],
    adoptiveParentIds = []
  ) {
    const personDetails = people.find((p) => p._id === personId);
    const parents = parentIds.map((parentId) =>
      people.find((person) => person._id === parentId)
    );
    const adoptiveParents = adoptiveParentIds.map((parentId) =>
      people.find((person) => person._id === parentId)
    );

    setPersonDetails(personDetails);
    setParentType(parentType);
    setParents(parents);
    setAdoptiveParents(adoptiveParents);
  }

  function closePersonDetails() {
    setPersonDetails(null);
  }

  function addNode(node) {
    const newNode = {
      partners: [],
    };

    // create a record of the child indexes in the tree to get to the node we
    // want to add a new node to
    let parentNode = node;
    const childIndexes = [];
    while (parentNode.parent) {
      // determine the current nodes index in the parent nodes children
      childIndexes.unshift(parentNode.parent.children.indexOf(parentNode));

      // move on to next parent node
      parentNode = parentNode.parent;
    }

    // Use the child indexes to add the new node to the tree
    const newTree = JSON.parse(JSON.stringify(tree)); // deep clone of the tree
    let currentNode = newTree.data;
    for (let i = 0; i < childIndexes.length; i++) {
      const index = childIndexes[i];
      currentNode = currentNode.children[index];
    }

    currentNode.children = currentNode.children
      ? [...currentNode.children, newNode]
      : [newNode];

    onChange(newTree);
  }

  function highlightParents(node, peopleIds) {
    setNodeToHighlight(node);
    setNodePeopleToHighlight(peopleIds);
  }

  const treeId = get(tree, "_id", "");

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-cover"
      style={{ backgroundImage: `url("/green-poly.jpg"` }}
    >
      {personDetails && (
        <PersonDetails
          adoptiveParents={adoptiveParents}
          aspirations={personDetails.aspirations}
          avatar={personDetails.avatar}
          bio={personDetails.bio}
          closeDetails={closePersonDetails}
          custom={personDetails.custom}
          firstName={personDetails.firstName}
          lastName={personDetails.lastName}
          lifeStates={personDetails.lifeStates}
          parentType={parentType}
          parents={parents}
          personId={personDetails._id}
          readonly={readonly}
          style={onChange ? { top: 65 } : { top: 0 }}
          traits={personDetails.traits}
          treeId={treeId}
        />
      )}

      <svg height="100%" ref={svg} width="100%">
        <CommonPatterns />

        <g ref={zoom}>
          <g className="transform-layer">
            {links.map((linkData, index) => (
              <Link key={index} linkData={linkData} />
            ))}

            {nodes.map((nodeData, index) => {
              // if the node we are rendering is the one where we need to
              // highlight some people (parents) then pass the array of
              // nodePeopleToHighlight otherwise default to an empty array.
              let highlightPeople = [];
              if (nodeData === nodeToHighlight) {
                highlightPeople = nodePeopleToHighlight;
              }

              return (
                <Node
                  addNode={addNode}
                  editNode={onEditNode}
                  highlightParents={highlightParents}
                  highlightPeople={highlightPeople}
                  key={index}
                  nodeData={nodeData}
                  people={people}
                  readonly={readonly}
                  showPersonDetails={showPersonDetails}
                />
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
};