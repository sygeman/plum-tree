import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.scss";

export default ({ onItemClick }) => {
  const trees = [];

  return (
    <div>
      <ul className={styles.navList}>
        <li>
          <Link to="/" onClick={onItemClick}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/guides" onClick={onItemClick}>
            Guides
          </Link>
        </li>
      </ul>

      <div className={styles.navTreesHeader}>Your Trees</div>

      <ul className={[styles.navList, styles.lastNav].join(" ")}>
        <li>
          <Link to="/trees/create" onClick={onItemClick}>
            Create New
          </Link>
        </li>
        {trees.map((tree) => {
          const url = `/trees/${tree._id}`;
          return (
            <li key={tree._id}>
              <Link to={url} onClick={onItemClick}>
                {tree.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
