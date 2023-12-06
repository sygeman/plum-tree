import axios from "axios";
import get from "lodash.get";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import defaultAvatar from "../../assets/default-avatar.png";

// .loading {
//   text-align: center;
// }

// .navButtons {
//   > * {
//     margin-right: 10px;
//   }

//   text-align: center;
// }

// .personTile {
//   border: 1px solid $grey-lightest;
//   border-bottom-width: 2px;
//   border-radius: $default-border-radius;
//   transition: border $transition-speed linear;
//   margin: 15px 0px;
//   color: $font-color;
//   text-decoration: none;
//   display: flex;
//   align-items: center;
//   position: relative;

//   &:hover {
//     border-bottom-color: $color1;

//     .tileArrow {
//       color: $color1;
//     }
//   }
// }

// .avatar {
//   width: 70px;
//   height: 70px;
//   margin: 15px 10px;
//   border-radius: 50%;
//   background-size: cover;
//   background-position-x: center;
//   background-position-y: center;
//   box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
// }

// .personMenu {
//   position: absolute;
//   top: 5px;
//   right: 5px;

//   a, button {
//     margin-left: 5px;
//   }
// }

export const TreePeople = () => {
  const params = useParams();
  const { treeId } = params;
  const [people, setPeople] = useState([]);
  const [tree, setTree] = useState(null);
  const [filter, setFilter] = useState("");
  const [filteredPeople, setFilteredPeople] = useState([]);

  useEffect(() => {
    axios
      .all([
        axios.get(`/api/people?tree=${treeId}`),
        axios.get(`/api/trees/${treeId}`),
      ])
      .then(
        axios.spread((peopleResponse, treeResponse) => {
          const people = get(peopleResponse, "data");
          const tree = get(treeResponse, "data");

          setPeople(people);
          setTree(tree);
          setFilter("");
          setFilteredPeople(people);
        })
      );
  }, []);

  function handleFilterPeople(event) {
    setFilter(event.target.value);
    setFilteredPeople(_filterPeople(people, event.target.value));
  }

  function _filterPeople(people, filter = "") {
    if (filter === "") {
      return people;
    }

    return people.filter((person) => {
      const name = `${person.firstName} ${person.lastName}`.toLowerCase();
      return name.includes(filter.toLowerCase());
    });
  }

  function deletePerson(personId) {
    const deleteConfirmed = confirm(
      "Are you sure you want to delete this person?"
    );

    if (deleteConfirmed) {
      // delete all references of this person in the tree
      const updatedTree = Object.assign({}, tree);
      _removePersonFromTree(personId, updatedTree.data);

      axios
        .all([
          axios.patch(`/api/trees/${treeId}`, { data: updatedTree.data }),
          axios.delete(`/api/people/${personId}`),
        ])
        .then(
          axios.spread((saveTreeResponse, deletePersonResponse) => {
            setPeople(people.filter((person) => person._id !== personId));
            setFilteredPeople(
              filteredPeople.filter((person) => person._id !== personId)
            );
          })
        );
    }
  }

  function _removePersonFromTree(personId, treeNode) {
    if (get(treeNode, "person._id") === personId) {
      treeNode.person = null;
    }

    if (get(treeNode, "adoptiveParents.length", false)) {
      treeNode.adoptiveParents = treeNode.adoptiveParents.filter(
        (parent) => parent._id !== personId
      );
    }
    if (get(treeNode, "parents.length", false)) {
      treeNode.parents = treeNode.parents.filter(
        (parent) => parent._id !== personId
      );
    }
    if (get(treeNode, "partners.length", false)) {
      treeNode.partners.forEach((partnerRow) => {
        if (get(partnerRow, "people.length", false)) {
          partnerRow.people = partnerRow.people.filter(
            (partner) => partner._id !== personId
          );
        }
      });
    }
    if (get(treeNode, "children.length", false)) {
      treeNode.children.forEach((child) =>
        _removePersonFromTree(personId, child)
      );
    }
  }

  const personCreateLink = `/trees/${treeId}/people/add`;

  return (
    <div className="container">
      <h1>Manage People in Your Tree</h1>
      <p>
        Here you can create people to place in the structure of your family tree
        or edit existing people already in the tree.
      </p>
      <div className={styles.navButtons}>
        <Link
          className="btn btn-default"
          id="back-to-tree"
          to={`/trees/${treeId}`}
        >
          <i className="icon-chevron-left" /> Back to Your Tree
        </Link>
        <Link
          className="btn btn-primary"
          id="add-new-person"
          to={personCreateLink}
        >
          <i className="icon-plus" /> Add Someone New
        </Link>
      </div>
      <div className="form-group">
        <label>Search</label>
        <input
          className="form-control"
          name="filter"
          onChange={handleFilterPeople}
          placeholder="Start typing to filter..."
          type="text"
          value={filter}
        />
      </div>
      {filteredPeople.map((person) => {
        const personEditLink = `/trees/${treeId}/people/${person._id}`;
        const personLinkLink = `/trees/${treeId}/people/${person._id}/link`;

        let backgroundImage;
        if (person.avatar) {
          backgroundImage = `url(${getUploadedImageUri(
            person.avatar,
            "200x200"
          )})`;
        } else {
          backgroundImage = `url(${defaultAvatar})`;
        }

        const inlineAvatarStyle = { backgroundImage };
        let name;
        if (person.firstName || person.lastName) {
          name = `${person.firstName} ${person.lastName}`;
        } else {
          name = <i>~ No Name ~</i>;
        }

        return (
          <div
            className={`${styles.personTile} people-list-item`}
            key={person._id}
          >
            <div className={styles.avatar} style={inlineAvatarStyle} />
            <div>{name}</div>
            <div className={styles.personMenu}>
              <Link
                className="btn btn-small btn-default edit-person"
                to={personEditLink}
              >
                Edit
              </Link>
              <Link
                className="btn btn-small btn-default link-person"
                to={personLinkLink}
              >
                Link
              </Link>
              <button
                className="btn btn-small btn-danger delete-person"
                onClick={() => deletePerson(person._id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
