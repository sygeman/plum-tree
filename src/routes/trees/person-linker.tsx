import axios from "axios";
import get from "lodash.get";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Loading } from "../../components/loading";

// .linkTile {
//   border: 1px solid $grey-lightest;
//   border-bottom-width: 2px;
//   border-radius: $default-border-radius;
//   transition: border $transition-speed linear;
//   margin: 15px 0px;
//   color: $font-color;
//   text-decoration: none;
//   position: relative;

//   &:hover {
//     border-bottom-color: $color1;

//     .tileArrow {
//       color: $color1;
//     }
//   }
// }

// .linkDetails {
//   padding: 10px 15px;
// }

// .linkMenu {
//   position: absolute;
//   top: 5px;
//   right: 5px;

//   a, button {
//     margin-left: 5px;
//   }
// }

export const PersonLinker = () => {
  const params = useParams();
  const { personId, treeId } = params;
  const [title, setTitle] = useState("");
  const [person, setPerson] = useState("");
  const [tree, setTree] = useState("");
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/people/${personId}`)
      .then((response) => {
        const links = get(response, "data.links", []);
        setLoading(false);
        setLinks(links);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(
          get(
            error,
            "response.data.errors[0].detail",
            "Unknown error occurred"
          ),
          { autoClose: false }
        );
      });
  }, []);

  function handleSubmit(event: any) {
    event.preventDefault();

    links.push({
      personId: person,
      title,
      treeId: tree,
    });

    axios
      .put(`/api/people/${personId}`, { links })
      .then((response) => {
        toast.success("Person links updated");
        setLinks(response.data.links);
      })
      .catch((error) => {
        toast.error(
          get(
            error,
            "response.data.errors[0].detail",
            "Unknown error occurred updating persons links"
          ),
          { autoClose: false }
        );
      });
  }

  function deleteLink(linkData: any) {
    const newLinks = links.filter((link) => {
      return link !== linkData;
    });

    axios
      .put(`/api/people/${personId}`, { links: newLinks })
      .then((response) => {
        toast.success("Person links updated");
        setLinks(response.data.links);
      })
      .catch((error) => {
        toast.error(
          get(
            error,
            "response.data.errors[0].detail",
            "Unknown error occurred updating persons links"
          ),
          { autoClose: false }
        );
      });
  }

  if (loading) {
    return <Loading message="Loading Person Links" />;
  }

  const cancelClass = ["mr-2", "btn", "btn-default"].join(" ");
  const submitClass = ["mr-2", "btn", "btn-primary"].join(" ");
  const cancelLink = `/trees/${treeId}/people`;

  return (
    <div className="container">
      <h1>Link Person</h1>
      <p>
        If this person is also in another tree elsewhere you can link the two
        trees via this person.
      </p>
      <p>
        You'll need the tree ID and the ID of the person you want to link to
        from that tree.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            id="link-tree-title"
            name="title"
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="My Other Tree"
            type="text"
            value={title}
          />
        </div>
        <div className="form-group">
          <label>Tree ID</label>
          <input
            className="form-control"
            id="link-tree-id"
            name="tree"
            onChange={(ev) => setTree(ev.target.value)}
            type="text"
            value={tree}
          />
        </div>
        <div className="form-group">
          <label>Person ID</label>
          <input
            className="form-control"
            id="link-tree-person"
            name="person"
            onChange={(ev) => setPerson(ev.target.value)}
            type="text"
            value={person}
          />
        </div>
        <Link className={cancelClass} to={cancelLink}>
          <i className="icon-chevron-left" /> Back to Tree People
        </Link>
        <button className={submitClass} id="submit-tree-link" type="submit">
          <i className="icon-plus" /> Link Person
        </button>
      </form>
      <h2>Existing Links</h2>

      {links.length ? (
        <p>
          Here's the links to other trees this person already has. Remember a
          Sim can be linked to multiple trees.
        </p>
      ) : (
        <p>Links you add/create will appear here.</p>
      )}

      {links.map((linkData, index) => {
        return (
          <div className={"styles.linkTile"} key={index}>
            <div className={"styles.linkMenu"}>
              <button
                className="btn btn-small btn-danger"
                onClick={() => deleteLink(linkData)}
              >
                Delete
              </button>
            </div>
            <div className={"styles.linkDetails"}>
              <a href="/" id={`link-info-title-${index}`}>
                {linkData.title} <i className="icon-link" />
              </a>
              <div id={`link-info-tree-${index}`}>
                <strong>Tree Id:</strong> {linkData.treeId}
              </div>
              <div id={`link-info-person-${index}`}>
                <strong>Person Id:</strong> {linkData.personId}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
