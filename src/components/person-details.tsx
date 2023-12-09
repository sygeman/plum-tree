import { tree } from "@/state";
import get from "lodash.get";
import { useState } from "react";

// adoptiveParents = [],
// aspirations = [],
// avatar,
// bio,
// closeDetails,
// custom = [],
// firstName,
// lastName,
// lifeStates = [],
// parentType = "NONE",
// parents = [],
// personId,
// traits = [],

export const PersonDetails = () => {
  const treeId = get(tree.value, "_id", "");
  const [linkDataVisible, setLinkDataVisible] = useState(false);

  function handleToggleLinkData() {
    setLinkDataVisible(!linkDataVisible);
  }

  return (
    <div className="absolute z-100 top-0 right-0 w-[300px] m-4 p-4 bg-[#f4f7f6] overflow-auto">
      {/* {!readonly && (
        <Link
          className={"styles.editButton"}
          to={`/trees/${treeId}/people/${personId}`}
        >
          <span>Edit</span>
        </Link>
      )} */}
      <div id="close-person-details" onClick={() => closeDetails()}>
        <span>Close</span>
      </div>
      <div className="text-center">
        <h2 id="person-details-name">
          {firstName} {lastName}
        </h2>
      </div>
      <div>{bio}</div>

      {parents.length > 0 && (
        <div>
          <h3 id="person-details-biological-parents-title">
            Biological Parents <ParentType type={parentType} />
          </h3>
          <div>
            {parents.map((parent, index) => (
              <div key={index}>
                {parent.firstName} {parent.lastName}
              </div>
            ))}
          </div>
        </div>
      )}

      {adoptiveParents.length > 0 && (
        <div>
          <h3>Adoptive Parents</h3>
          <div>
            {adoptiveParents.map((parent, index) => (
              <div key={index}>
                {parent.firstName} {parent.lastName}
              </div>
            ))}
          </div>
        </div>
      )}

      {traits.length > 0 && (
        <div>
          <h3>Traits</h3>
          <div>
            {traits.map((trait, index) => (
              <span key={index}>{trait}</span>
            ))}
          </div>
        </div>
      )}

      {aspirations.length > 0 && (
        <div>
          <h3>Aspirations</h3>
          <div>
            {aspirations.map((aspiration, index) => (
              <span key={index}>{aspiration}</span>
            ))}
          </div>
        </div>
      )}

      {lifeStates.length > 0 && (
        <div>
          <h3>Life States</h3>
          {lifeStates.map((lifeState, index) => (
            <span key={index}>{lifeState}</span>
          ))}
        </div>
      )}

      {custom.length > 0 && (
        <div>
          <h3>More</h3>

          <table className="table">
            <tbody>
              {custom.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{item.title}</th>
                    <td>{item.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div onClick={handleToggleLinkData}>
        {linkDataVisible ? "Hide Link Details" : "Show Link Details"}
      </div>
      {linkDataVisible && (
        <div>
          <div>
            Tree Id <code>{treeId}</code>
          </div>
          <div>
            Person Id <code>{personId}</code>
          </div>
        </div>
      )}
    </div>
  );
};

const ParentType = ({ type }) => {
  if (type === "CLONE") {
    return <span className="label label-blue">Clone</span>;
  } else if (type === "ABDUCTION") {
    return <span className="label label-green">Alien Abduction</span>;
  } else {
    return null;
  }
};
