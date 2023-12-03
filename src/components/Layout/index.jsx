import React, { useState } from "react";
import { Route, Link, Routes } from "react-router-dom";

import styles from "./styles.scss";
import logo from "../../common/images/logo.png";

import Home from "../Home";
import Guides from "../Guides";
import TreeDetails from "../trees/TreeDetails";
import TreeEditor from "../trees/TreeEditor";
import TreePeople from "../trees/TreePeople";
import PersonEditor from "../trees/PersonEditor";
import PersonLinker from "../trees/PersonLinker";
import SideNav from "../SideNav";

export default () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.root}>
      <div
        className={
          menuOpen
            ? `${styles.container} ${styles.containerActiveMenu}`
            : styles.container
        }
      >
        <header className={styles.header}>
          <div className={styles.menuButton} onClick={() => setMenuOpen(true)}>
            <i
              className={
                menuOpen
                  ? `${styles.hamburger} ${styles.hamburgerActive}`
                  : styles.hamburger
              }
            >
              <div />
              <div />
              <div />
            </i>
            Menu
          </div>

          <div className={styles.brand}>
            <img
              src={logo}
              className={styles.headerLogo}
              height="40"
              width="40"
            />
            <h1 className="hidden-xs-down">
              <Link to="/"> The Plum Tree </Link>
            </h1>
          </div>
        </header>

        <div className={styles.body}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/guides/*" element={<Guides />} />
            <Route exact path="/trees/create" element={<TreeDetails />} />
            <Route exact path="/trees/:treeId" element={<TreeEditor />} />
            <Route
              exact
              path="/trees/:treeId/details"
              element={<TreeDetails />}
            />
            <Route
              exact
              path="/trees/:treeId/people"
              element={<TreePeople />}
            />
            <Route
              exact
              path="/trees/:treeId/people/add"
              element={<PersonEditor />}
            />
            <Route
              exact
              path="/trees/:treeId/people/:personId"
              element={<PersonEditor />}
            />
            <Route
              exact
              path="/trees/:treeId/people/:personId/link"
              element={<PersonLinker />}
            />
          </Routes>
        </div>

        <nav className={styles.nav}>
          <div className={styles.closeRow}>
            <div
              className={styles.closeButton}
              onClick={() => setMenuOpen(false)}
            >
              <span>Close</span>
              <i className={styles.close} />
            </div>
          </div>
          <SideNav onItemClick={() => setMenuOpen(false)} />
        </nav>
        <div
          className={
            menuOpen
              ? `${styles.navMask} ${styles.navMaskActiveMenu}`
              : styles.navMask
          }
          onClick={() => setMenuOpen(false)}
        />
      </div>
    </div>
  );
};
