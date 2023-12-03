import { useState } from "react";
import { Route, Link, Routes } from "react-router-dom";

import logo from "../assets/logo.png";

import Home from "./home";
import Guides from "./guides";
import TreeDetails from "./trees/tree-details";
import TreeEditor from "./trees/tree-editor";
import TreePeople from "./trees/tree-people";
import PersonEditor from "./trees/person-editor";
import PersonLinker from "./trees/person-linker";
import SideNav from "./side-nav";

// .root {
//   position: absolute;
//   width: 100%;
//   left: 0px;
//   top: 0px;
//   bottom: 0px;
//   right: 0px;
//   overflow: hidden;
// }

// .container {
//   position: absolute;
//   width: 100%;
//   top: 0px;
//   left: 0px;
//   bottom: 0px;
//   right: 0px;
//   transition: left 0.3s ease-in-out;
// }

// .containerActiveMenu {
//   left: 320px;
// }

// .header {
//   background-color: #6F1E51;
//   color: #ffffff;
//   position: absolute;
//   top: 0px;
//   left: 0px;
//   right: 0px;
//   height: 50px;
//   display: flex;
// }

// .headerLogo {
//   padding: 5px;
// }

// .brand {
//   flex: 1;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-shadow: 0 1px 2px rgba(0,0,0,.2);

//   h1 {
//     font-size: 18px;
//     padding: 0px 10px;
//     margin: 0px;
//     line-height: 50px;

//     a {
//       color: #fff;
//       text-decoration: none;

//       &:hover {
//         text-decoration: underline;
//       }
//     }
//   }
// }

// .menuButton {
//   margin: 10px;
//   padding: 0px 10px;
//   line-height: 30px;
//   border-radius: 5px;
//   cursor: pointer;
//   text-shadow: 0 1px 2px rgba(0,0,0,.2);
//   color: #fff;
//   text-decoration: none;
//   font-size: 14px;

//   &:hover {
//     background-color: #833471;
//   }
// }

// .hamburger {
//   display: inline-block;
//   padding-right: 10px;
//   position: relative;
//   top: 2px;
//   transition: top 0.3s ease-in-out;

//   div {
//     width: 10px;
//     height: 1px;
//     background-color: #fff;
//     margin: 3px 0;
//     transition: margin 0.3s ease-in-out;
//   }
// }

// .hamburgerActive {
//   top: 4px;

//   div {
//     margin: 4px 0;
//   }
// }

// .closeRow {
//   padding: 10px;
//   display: flex;
//   justify-content: flex-end;
//   border-bottom: 1px solid #E6EAEA;
// }

// .closeButton {
//   padding: 5px 20px;
//   cursor: pointer;
//   line-height: 30px;
//   border-radius: 5px;
//   transition: background 0.3s ease-in-out;

//   &:hover {
//     background: #eee;

//     .close {
//       opacity: 1;
//     }
//   }
// }

// .close {
//   position: relative;
//   width: 20px;
//   height: 20px;
//   margin: 10px;
//   top: 5px;
//   opacity: 0.3;
//   transition: opacity 0.3s ease-in-out;

//   &:before, &:after {
//     position: absolute;
//     content: ' ';
//     height: 20px;
//     width: 1px;
//     left: 10px;
//     background-color: #333;
//   }

//   &:before {
//     transform: rotate(45deg);
//   }

//   &:after {
//     transform: rotate(-45deg);
//   }
// }

// .nav {
//   position: absolute;
//   width: 320px;
//   left: -320px;
//   top: 0px;
//   bottom: 0px;
//   background: #f4f7f6;
//   overflow: auto;
// }

// .navMask {
//   position: absolute;
//   width: 100%;
//   left: 0px;
//   top: 0px;
//   bottom: 0px;
//   right: 0px;
//   background: black;
//   opacity: 0;
//   visibility: hidden;
//   transition: 0.3s ease-in-out;
// }

// .navMaskActiveMenu {
//   opacity: 0.7;
//   visibility: visible;
// }

// .body {
//   position: absolute;
//   top: 50px;
//   left: 0px;
//   right: 0px;
//   bottom: 0px;
//   overflow: auto;
// }

export const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={"styles.root"}>
      <div
        className={
          menuOpen
            ? `${"styles.container"} ${"styles.containerActiveMenu"}`
            : "styles.container"
        }
      >
        <header className={"styles.header"}>
          <div
            className={"styles.menuButton"}
            onClick={() => setMenuOpen(true)}
          >
            <i
              className={
                menuOpen
                  ? `${"styles.hamburger"} ${"styles.hamburgerActive"}`
                  : "styles.hamburger"
              }
            >
              <div />
              <div />
              <div />
            </i>
            Menu
          </div>

          <div className={"styles.brand"}>
            <img
              src={logo}
              className={"styles.headerLogo"}
              height="40"
              width="40"
            />
            <h1 className="hidden-xs-down">
              <Link to="/"> The Plum Tree </Link>
            </h1>
          </div>
        </header>

        <div className={"styles.body"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guides/*" element={<Guides />} />
            <Route path="/trees/create" element={<TreeDetails />} />
            <Route path="/trees/:treeId" element={<TreeEditor />} />
            <Route path="/trees/:treeId/details" element={<TreeDetails />} />
            <Route path="/trees/:treeId/people" element={<TreePeople />} />
            <Route
              path="/trees/:treeId/people/add"
              element={<PersonEditor />}
            />
            <Route
              path="/trees/:treeId/people/:personId"
              element={<PersonEditor />}
            />
            <Route
              path="/trees/:treeId/people/:personId/link"
              element={<PersonLinker />}
            />
          </Routes>
        </div>

        <nav className={"styles.nav"}>
          <div className={"styles.closeRow"}>
            <div
              className={"styles.closeButton"}
              onClick={() => setMenuOpen(false)}
            >
              <span>Close</span>
              <i className={"styles.close"} />
            </div>
          </div>
          <SideNav onItemClick={() => setMenuOpen(false)} />
        </nav>
        <div
          className={
            menuOpen
              ? `$'{styles.navMask'} ${"styles.navMaskActiveMenu"}`
              : "styles.navMask"
          }
          onClick={() => setMenuOpen(false)}
        />
      </div>
    </div>
  );
};
