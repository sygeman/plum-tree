import axios from "axios";
import get from "lodash.get";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { ImageManager } from "../../components/image-manager";
import { Loading } from "../../components/loading";
import { RichEditor } from "../../components/rich-editor";

export const TreeDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { treeId } = params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState(null);
  const [coverUri, setCoverUri] = useState(null);
  const [loading, setLoading] = useState(!!treeId);

  useEffect(() => {
    if (treeId) {
      axios
        .get(`/api/trees/${treeId}`)
        .then((response) => {
          const { cover, description, title } = response.data;
          setTitle(title);
          setDescription(description);
          setCover(cover);
          // setCoverUri(getUploadedImageUri(cover, "600x320"));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error(
            get(
              error,
              "response.data.errors[0].detail",
              "Failed to get tree info"
            ),
            { autoClose: false }
          );
        });
    }
  }, []);

  function updateCover(image) {
    // setCoverUri(getOrigUploadedImageUri(image));
    setCover(image);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const tree = { cover, description, title };

    if (treeId) {
      _updateTree(treeId, tree);
    } else {
      _createTree(tree);
    }
  }

  function _createTree(tree) {
    axios
      .post("/api/trees", tree)
      .then((response) => {
        const tree = get(response, "data");
        const treeId = get(response, "data._id");
        toast.success("Tree created");
        navigate(`/trees/${treeId}`);
        // update the side nav
        // addTree(tree)
      })
      .catch((error) => {
        toast.error(
          get(
            error,
            "response.data.errors[0].detail",
            "Unknown error occurred creating tree"
          ),
          { autoClose: false }
        );
      });
  }

  function _updateTree(treeId, tree) {
    axios
      .patch(`/api/trees/${treeId}`, tree)
      .then(() => {
        toast.success("Tree details updated");
        navigate(`/trees/${treeId}`);
        // update the side nav
        // updateTree(Object.assign(tree, { _id: treeId }))
      })
      .catch((error) => {
        toast.error(
          get(
            error,
            "response.data.errors[0].detail",
            "Unknown error occurred updating tree details"
          ),
          { autoClose: false }
        );
      });
  }

  if (loading) {
    return <Loading message="Loading..." />;
  }

  const cancelLink = treeId ? `/trees/${treeId}` : "/";

  let imagePreview;
  if (cover) {
    console.log(cover);
    const style = { backgroundImage: `url(${coverUri})` };
    imagePreview = <div className="" style={style} />;
  } else {
    imagePreview = <div className="">No cover image currently set.</div>;
  }

  return (
    <div className="container">
      <h1>{treeId ? "Update Tree Details" : "Create a New Tree"}</h1>

      <ImageManager
        dir="cover"
        image={cover}
        imagePreview={imagePreview}
        onImageChange={updateCover}
      />

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            id="tree-title-input"
            name="title"
            onChange={(ev) => setTitle(ev.target.value)}
            type="text"
            value={title}
          />
        </div>
        <RichEditor initialHtml={description} onUpdate={setDescription} />
        <Link to={cancelLink}>Cancel</Link>
        <button id="tree-details-submit" type="submit">
          {treeId ? "Update Tree Details" : "Create Tree"}
        </button>
      </form>
    </div>
  );
};
