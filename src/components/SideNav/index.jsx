import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.scss";
import auth from "../../common/js/auth";

export default ({ loadUsersTree, trees, onItemClick }) => {
  useEffect(() => {
    const authToken = auth.getToken();
    axios
      .get("/api/trees", { headers: { Authorization: `Bearer ${authToken}` } })
      .then((response) => {
        loadUsersTree(response.data);
      })
      .catch(() => {
        // nothing to do here - user is just not logged in
      });
  }, []);

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
