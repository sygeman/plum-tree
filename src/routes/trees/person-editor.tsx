import axios from "axios";
import get from "lodash.get";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select/creatable";
import { toast } from "react-toastify";

import defaultAvatar from "../../assets/default-avatar.png";
import { ImageManager } from "../../components/image-manager";
import { Loading } from "../../components/loading";
import { aspirationOptions } from "../../utils/aspirations";
import { lifeStateOptions } from "../../utils/life-states";
import { traitOptions } from "../../utils/traits";

// .personAvatarContainer {
//   text-align: center;
// }

// .personAvatarImage {
//   width: 70px;
//   height: 70px;
//   border-radius: 50%;
//   border: $color-white solid 4px;
//   box-shadow: 0 2px 3px 0 rgba(0,0,0,.075);
//   display: block;
//   margin: 0px auto;
//   margin-bottom: 10px;
//   background-position: center center;
//   background-size: cover;
// }

// .avatarButtons {
//   margin: 0px 10px !important;
// }

// .customInfo {
//   display: flex;
//   margin-bottom: 15px;

//   button {
//     margin: 0px;

//     &:hover,
//     &:focus{
//       transform: translateY(0px);
//     }
//   }

//   * {
//     border-radius: 0px;
//   }

//   :first-child {
//     border-top-left-radius: $input-border-radius;
//     border-bottom-left-radius: $input-border-radius;
//     border-right: none;
//   }

//   :last-child {
//     border-top-right-radius: $input-border-radius;
//     border-bottom-right-radius: $input-border-radius;
//   }
// }

export const PersonEditor = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { personId, treeId } = params;
  const [avatar, setAvatar] = useState(null);
  const [avatarUri, setAvatarUri] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [traits, setTraits] = useState([]);
  const [aspirations, setAspirations] = useState([]);
  const [lifeStates, setLifeStates] = useState([]);
  const [custom, setCustom] = useState([]);
  const [loading, setLoading] = useState(Boolean(personId));

  useEffect(() => {
    if (personId) {
      axios
        .get(`/api/people/${personId}`)
        .then((response) => {
          const {
            aspirations,
            avatar,
            bio,
            custom,
            firstName,
            lastName,
            lifeStates,
            traits,
          } = response.data;
          setAvatar(avatar);
          // setAvatarUri(getUploadedImageUri(avatar, "200x200"));
          setFirstName(firstName);
          setLastName(lastName);
          setBio(bio);
          setTraits(traits);
          setAspirations(aspirations);
          setLifeStates(lifeStates);
          setCustom(custom);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Failed to get person info", { autoClose: false });
        });
    }
  }, []);

  function updateAvatar(image) {
    // setAvatarUri(getOrigUploadedImageUri(image));
    setAvatar(image);
  }

  /**
   * Saves/updates the persons detail from what is currently in the state
   */
  function handleSubmit(event) {
    event.preventDefault();

    const person = {
      aspirations,
      avatar,
      bio,
      custom,
      firstName,
      lastName,
      lifeStates,
      traits,
      tree: treeId,
    };

    if (personId) {
      _updatePerson(person);
    } else {
      _createPerson(person);
    }
  }

  function _createPerson(person) {
    axios
      .post("/api/people", person)
      .then(() => {
        toast.success("Person created");
        navigate(`/trees/${treeId}/people`);
      })
      .catch((error) => {
        toast.error(
          get(
            error,
            "response.data.errors[0].detail",
            "Unknown error occurred creating person"
          ),
          { autoClose: false }
        );
      });
  }

  function _updatePerson(person) {
    axios
      .put(`/api/people/${personId}`, person)
      .then(() => {
        toast.success("Person updated");
        navigate(-1);
      })
      .catch((error) => {
        toast.error(
          get(
            error,
            "response.data.errors[0].detail",
            "Unknown error occurred updating person"
          ),
          { autoClose: false }
        );
      });
  }

  function handleAddCustomRow(event) {
    event.preventDefault();
    setCustom([...custom, { title: "", value: "" }]);
  }

  function handleRemoveCustomRow(event) {
    event.preventDefault();

    const indexToDelete = parseInt(event.target.dataset.index);
    const newCustom = custom.filter((item, index) => index !== indexToDelete);

    setCustom(newCustom);
  }

  function handleCustomFieldChange(event) {
    const index = parseInt(event.target.dataset.index);
    const { name, value } = event.target;

    const updated = {};
    updated[name] = value;

    const newCustom = custom.map((c, i) => {
      if (index !== i) {
        // This isn't the item we care about - keep it as-is
        return c;
      }

      return {
        ...c,
        ...updated,
      };
    });

    setCustom(newCustom);
  }

  if (loading) {
    return <Loading message="Loading person editor" />;
  }

  let imagePreview;
  if (avatar) {
    const style = { backgroundImage: `url(${avatarUri})` };
    imagePreview = <div className={styles.personAvatarImage} style={style} />;
  } else {
    const style = { backgroundImage: `url(${defaultAvatar})` };
    imagePreview = <div className={styles.personAvatarImage} style={style} />;
  }

  return (
    <div className="container">
      <h1>{personId ? "Edit Person" : "Create Person"}</h1>
      <ImageManager
        aspect={1}
        dir="avatar"
        image={avatar}
        imagePreview={imagePreview}
        onImageChange={updateAvatar}
      />

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            className="form-control"
            id="first-name"
            name="firstName"
            onChange={(ev) => setFirstName(ev.target.value)}
            type="text"
            value={firstName}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            className="form-control"
            id="last-name"
            name="lastName"
            onChange={(ev) => setLastName(ev.target.value)}
            type="text"
            value={lastName}
          />
        </div>

        {/* <RichEditor initialHtml={bio} onUpdate={setBio} /> */}

        <div className="form-group">
          <label>Traits</label>
          <PlumTreeMultiSelect
            defaultValues={traits}
            onValuesChange={(values) => setTraits(values.map((v) => v.value))}
            options={traitOptions}
          />
        </div>

        <div className="form-group">
          <label>Aspirations</label>
          <PlumTreeMultiSelect
            defaultValues={aspirations}
            onValuesChange={(values) =>
              setAspirations(values.map((v) => v.value))
            }
            options={aspirationOptions}
          />
        </div>

        <div className="form-group">
          <label>Life States</label>
          <PlumTreeMultiSelect
            defaultValues={lifeStates}
            onValuesChange={(values) =>
              setLifeStates(values.map((v) => v.value))
            }
            options={lifeStateOptions}
          />
        </div>

        <div className="form-group">
          <label>More (Custom)</label>
          <button className="btn btn-primary" onClick={handleAddCustomRow}>
            <i className="icon-plus" /> Add More Custom Info
          </button>

          {custom.map((c, i) => {
            return (
              <div className={styles.customInfo} key={i}>
                <input
                  className="form-control"
                  data-index={i}
                  name="title"
                  onChange={handleCustomFieldChange}
                  placeholder="Title"
                  type="text"
                  value={c.title}
                />
                <input
                  className="form-control"
                  data-index={i}
                  name="value"
                  onChange={handleCustomFieldChange}
                  placeholder="Value"
                  type="text"
                  value={c.value}
                />
                <button
                  className="btn btn-danger"
                  data-index={i}
                  onClick={handleRemoveCustomRow}
                >
                  <i className="icon-trash" />
                </button>
              </div>
            );
          })}
        </div>

        <Link className="btn btn-default" to={`/trees/${treeId}/people`}>
          Cancel
        </Link>
        <button className="btn btn-primary" id="save-person" type="submit">
          {personId ? "Update Person" : "Create Person"}
        </button>
      </form>
    </div>
  );
};

const PlumTreeMultiSelect = ({ defaultValues, onValuesChange, options }) => {
  const customStyles = {
    control: (provided, state) => {
      return {
        ...provided,
        ...{
          ":hover": {
            borderColor: "rgba(26, 188, 156, 1)",
          },
          borderColor: "#ccc",
        },
      };
    },
    multiValue: (provided, state) => {
      return {
        ...provided,
        ...{
          background: "#3498db",
          borderRadius: 3,
          boxShadow: "0 2px 3px 0 rgba(0,0,0,.075)",
        },
      };
    },
    multiValueLabel: (provided, state) => {
      return {
        ...provided,
        ...{
          color: "#fff",
          fontSize: 16,
          fontWeight: 300,
          padding: "3px 10px",
          textShadow: "0 1px 2px rgba(0,0,0,.2)",
        },
      };
    },
    multiValueRemove: (provided, state) => {
      return {
        ...provided,
        ...{
          ":hover": {
            backgroundColor: "#2980b9",
            color: "#fff",
          },
          color: "#fff",
          cursor: "pointer",
          textShadow: "0 1px 2px rgba(0,0,0,.2)",
        },
      };
    },
  };

  const optionObjects = options.map((value) => {
    return { label: value, value };
  });
  const defaultValueObjects = defaultValues.map((value) => {
    return { label: value, value };
  });

  return (
    <Select
      isMulti
      isSearchable
      onChange={onValuesChange}
      options={optionObjects}
      styles={customStyles}
      value={defaultValueObjects}
    />
  );
};
