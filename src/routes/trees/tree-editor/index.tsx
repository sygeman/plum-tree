import { useState } from "react";
import { useParams } from "react-router-dom";

import { NodeEditor } from "../node-editor";
import { Tree } from "../tree";
import { TreeToolbar } from "./toolbar";

// .toolbar, .toolbarMobile {
//   position: relative;
//   min-height: 50px;
//   background: $grey-lightest;
//   border: $grey-light solid 1px;
//   border-radius: $default-border-radius;
//   margin: 15px;
//   box-shadow: 0 2px 3px 0 rgba(0,0,0,.075);
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;

//   input[type="checkbox"] + label {
//     padding: 0px 15px;
//     margin: 0px;
//     cursor: pointer;
//     height: 50px;
//     line-height: 50px;
//     border-left: #ccc solid 1px;
//     font-weight: 300;
//     min-width: 100px;

//     &:hover {
//       background: #f4f7f6;
//     }
//   }
// }

// .toolbarMobile {
//   cursor: pointer;

//   &:hover {
//     background: #f4f7f6;
//   }
// }

// .hamburger {
//   display: inline-block;
//   padding-right: 15px;
//   position: relative;
//   top: 2px;
//   transition: 0.1s ease-in-out;

//   div {
//     width: 14px;
//     height: 1px;
//     background-color: $font-color;
//     margin: 3px 0;
//     transition: 0.1s ease-in-out;
//   }
// }

// .hamburgerActive {
//   top: 4px;

//   div {
//     margin: 6px 0;
//   }
// }

// .toolbarDropdown {
//   position: relative;
// }

// .toolbarItem, .toolbarHelp {
//   padding: 0px 15px;
//   margin: 0px;
//   cursor: pointer;
//   height: 50px;
//   line-height: 50px;
//   border-left: #ccc solid 1px;
//   font-weight: 300;
//   min-width: 100px;

//   &:hover {
//     background: #f4f7f6;
//   }
// }

// .downArrow {
//   border: solid $font-color;
//   padding: 3px;
//   margin: 3px 3px 3px 10px;
//   border-width: 0 1px 1px 0;
//   display: inline-block;
//   transform: rotate(45deg);
//   transition: 0.2s ease-in-out;
// }

// .downArrowActive {
//   margin: 5px 3px 0px 10px;
//   transform: rotate(225deg);
// }

// .menu, .menuMobile {
//   background: #f4f7f6;
//   border: 1px solid #E6EAEA;
//   border-radius: $default-border-radius;
//   color: #333;
//   position: absolute;
//   top: 60px;
//   right: 0px;
//   width: 230px;
//   box-shadow: 0 2px 3px 0 rgba(0,0,0,.075);
//   visibility: hidden;
//   opacity: 0;
//   z-index: 100;

//   transition: 0.2s ease-in-out;

//   ul {
//     list-style: none;
//     padding: 0px;
//     margin: 0px;

//     li {
//       cursor: pointer;
//       display: block;
//       text-decoration: none;

//       a, div {
//         display: block;
//         padding: 15px 15px;
//         color: $font-color;
//         text-decoration: none;
//         transition: background 0.2s ease-in-out;

//         &:hover {
//           background: #fff;
//         }
//       }
//     }
//   }
// }

// .menuActive, .menuMobileActive {
//   visibility: visible;
//   opacity: 1;
// }

// .menuMobile {
//   position: relative;
//   margin: 15px;
//   top: 0px;
//   width: initial;
// }

// .mobileMenuHeading {
//   font-size: 12px;
//   font-weight: 500;
//   padding: 3px 15px;
//   color: #12CBC4;
// }

// .toolbarTitle {
//   flex: 1;
//   padding: 0px 15px;
//   font-weight: 500;
//   color: $grey-medium;
// }

import { getTree } from "@/api/tree";

export const TreeEditor = () => {
  const { treeId } = useParams();
  const [tree, setTree] = useState(getTree(treeId));
  const [people, setPeople] = useState(getTree(treeId).people);
  const [readonly, setReadonly] = useState(false);
  const [nodeToEdit, setNodeToEdit] = useState(null);

  function saveTree(tree) {
    setTree(tree);
  }

  console.log(tree);

  return (
    <div>
      <h1 className="sr-only">Tree Editor</h1>
      <Tree
        onChange={saveTree}
        onEditNode={setNodeToEdit}
        people={people}
        readonly={readonly}
        tree={tree}
      />
      {/* <TreeToolbar
        saveTree={saveTree}
        setPreviewMode={setReadonly}
        tree={tree}
      /> */}
      {nodeToEdit && (
        <NodeEditor
          close={() => setNodeToEdit(null)}
          node={nodeToEdit}
          onChange={saveTree}
          people={people}
          tree={tree}
        />
      )}
    </div>
  );
};
