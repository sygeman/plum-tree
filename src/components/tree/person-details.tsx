import { useState } from "react";

import defaultAvatar from "/default-avatar.png";

export const PersonDetails = ({
  adoptiveParents = [],
  aspirations = [],
  avatar,
  bio,
  closeDetails,
  custom = [],
  firstName,
  lastName,
  lifeStates = [],
  parentType = "NONE",
  parents = [],
  personId,
  readonly,
  style,
  traits = [],
  treeId,
}) => {
  const [linkDataVisible, setLinkDataVisible] = useState(false);

  function handleToggleLinkData() {
    setLinkDataVisible(!linkDataVisible);
  }

  const inlineAvatarStyle = {};
  // if (avatar) {
  //   inlineAvatarStyle.backgroundImage = `url(${(
  //     avatar
  //
  //   )})`;
  // } else {
  //   inlineAvatarStyle.backgroundImage = `url(${defaultAvatar})`;
  // }

  return (
    //     .editButton,
    // .closeButton {
    //   position: absolute;
    //   text-decoration: none;
    //   color: $font-color;
    //   top: 15px;
    //   background: #f4f7f6;
    //   padding: 5px 15px;
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

    // .closeButton {
    //   right: 15px;
    // }
    <div
      className="absolute z-100 bottom-0 right-0 w-[300px] m-4 p-4 bg-[#f4f7f6] overflow-auto"
      style={style}
    >
      {/* {!readonly && (
        <Link
          className={"styles.editButton"}
          to={`/trees/${treeId}/people/${personId}`}
        >
          <span>Edit</span>
        </Link>
      )} */}
      <div
        className={"styles.closeButton"}
        id="close-person-details"
        onClick={() => closeDetails()}
      >
        <span>Close</span>
      </div>
      <div className="text-center">
        <div
          // .personDetailsAvatar {
          //   width: 70px;
          //   height: 70px;
          //   border-radius: 50%;
          //   border: $color-white solid 4px;
          //   box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.075);
          //   display: block;
          //   margin: 0px auto;
          //   background-position: center center;
          //   background-size: cover;
          // }
          className={"styles.personDetailsAvatar"}
          style={inlineAvatarStyle}
        />
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
            {parents.map((parent, index) => {
              const backgroundImage = parent.avatar
                ? `url(${parent.avatar})`
                : `url(${defaultAvatar})`;
              return (
                // .parentRow {
                //   display: flex;
                //   margin-bottom: 10px;
                //   justify-content: flex-start;
                //   align-items: center;
                // }
                <div className={"styles.parentRow"} key={index}>
                  <div
                    // .parentAvatar {
                    //   width: 40px;
                    //   height: 40px;
                    //   border-radius: 50%;
                    //   border: $color-white solid 4px;
                    //   box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.075);
                    //   display: block;
                    //   margin-right: 10px;
                    //   background-position: center center;
                    //   background-size: cover;
                    // }
                    className={"styles.parentAvatar"}
                    style={{ backgroundImage }}
                  />
                  <span className="person-details-biological-parent-name">
                    {parent.firstName} {parent.lastName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {adoptiveParents.length > 0 && (
        <div>
          <h3>Adoptive Parents</h3>
          <div>
            {adoptiveParents.map((parent, index) => {
              const backgroundImage = parent.avatar
                ? `url(${parent.avatar})`
                : `url(${defaultAvatar})`;
              return (
                // .parentRow {
                //   display: flex;
                //   margin-bottom: 10px;
                //   justify-content: flex-start;
                //   align-items: center;
                // }
                <div className={"styles.parentRow"} key={index}>
                  <div
                    // .parentAvatar {
                    //   width: 40px;
                    //   height: 40px;
                    //   border-radius: 50%;
                    //   border: $color-white solid 4px;
                    //   box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.075);
                    //   display: block;
                    //   margin-right: 10px;
                    //   background-position: center center;
                    //   background-size: cover;
                    // }
                    className={"styles.parentAvatar"}
                    style={{ backgroundImage }}
                  />
                  <span>
                    {parent.firstName} {parent.lastName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {traits.length > 0 && (
        <div>
          <h3>Traits</h3>
          <div>
            {traits.map((trait, index) => {
              return (
                // .tag {
                //   background: $blue1;
                //   color: $color-white;
                //   padding: 3px 10px;
                //   margin-right: 7px;
                //   margin-bottom: 10px;
                //   border-radius: $default-border-radius;
                //   box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.075);
                //   text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
                //   display: inline-block;
                // }
                <span className={"styles.tag"} key={index}>
                  {trait}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {aspirations.length > 0 && (
        <div>
          <h3>Aspirations</h3>
          <div>
            {aspirations.map((aspiration, index) => {
              return (
                // .tag {
                //   background: $blue1;
                //   color: $color-white;
                //   padding: 3px 10px;
                //   margin-right: 7px;
                //   margin-bottom: 10px;
                //   border-radius: $default-border-radius;
                //   box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.075);
                //   text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
                //   display: inline-block;
                // }
                <span className={"styles.tag"} key={index}>
                  {aspiration}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {lifeStates.length > 0 && (
        <div>
          <h3>Life States</h3>

          {lifeStates.map((lifeState, index) => {
            return (
              // .tag {
              //   background: $blue1;
              //   color: $color-white;
              //   padding: 3px 10px;
              //   margin-right: 7px;
              //   margin-bottom: 10px;
              //   border-radius: $default-border-radius;
              //   box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.075);
              //   text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
              //   display: inline-block;
              // }
              <span className={"styles.tag"} key={index}>
                {lifeState}
              </span>
            );
          })}
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

      <div
        // .linkDetailsToggle {
        //   font-size: smaller;
        //   color: $blue1;
        //   text-decoration: underline;
        //   cursor: pointer;
        //   display: inline;
        // }
        className={"styles.linkDetailsToggle"}
        onClick={handleToggleLinkData}
      >
        {linkDataVisible ? "Hide Link Details" : "Show Link Details"}
      </div>
      {linkDataVisible && (
        // .linkDetails {
        //   font-size: smaller;
        // }
        <div className={"styles.linkDetails"}>
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
