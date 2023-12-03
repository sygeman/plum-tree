import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.scss";
import plumbob from "./plumbob.png";
import thumbsup from "./thumbsup.png";

export default () => {
  return (
    <div>
      <div className={styles.homeBannerImage} />
      <div className="container">
        <div className={styles.introPanel}>
          <p>Welcome to the plum tree app!</p>
          <p>Create dynamic family trees for your sims legacies.</p>
          <p>Then publish and share your trees for others to see.</p>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <img src={plumbob} className={styles.featureImage} width="100" />
            <p>
              Crafted with Sims in mind we allow to set traits, aspirations and
              other Sims specific details to really help convey your sims
              colourful lives.
            </p>
          </div>
          <div className="col-12 col-md-6">
            <img src={thumbsup} className={styles.featureImage} width="100" />
            <p>
              Built to be simple yet flexible so you can easily build and share
              your sims legacy.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <h2>Guides</h2>
            <Link className={styles.guidesImage} to="/guides" />
            <p>
              Get up to speed with how to use The Plum Tree with our guides.
            </p>
            <Link className="btn btn-primary" to="/guides">
              Read The Guides
            </Link>
          </div>

          <div className="col-12 col-md-6">
            <h2>Using The Plum Tree</h2>

            <div className={styles.guideVideo}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/QatRM3knISY"
                frameBorder="0"
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
