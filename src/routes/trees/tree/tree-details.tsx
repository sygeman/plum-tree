import { RawHTML } from "./raw-html";

// .treeDetails {
//   position: absolute;
//   top: 65px;
//   bottom: 0px;
//   right: 15px;
//   left: 15px;
//   max-width: 300px;
//   margin: 15px 0;
//   box-shadow: 0 2px 3px 0 rgba(0,0,0,.075);
//   z-index: 200;
//   background: #f4f7f6;
//   border: $grey-light solid 1px;
//   border-radius: $default-border-radius;
//   overflow: auto;
// }

// .treeImage {
//   background-repeat: cover;
//   height: 160px;
//   background-size: cover;
//   background-position-x: center;
//   background-position-y: center;
//   position: relative;
//   width: 100%;
//   left: 0px;
//   top: 0px;
//   right: 0px;
// }

// .treeDetailsContent {
//   padding: 15px;
// }

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

export const TreeDetails = ({
  closeDetails,
  description,
  image,
  style,
  title,
}) => {
  const inlineAvatarStyle = {};
  // if (image) {
  //   inlineAvatarStyle.backgroundImage = `url(${(
  //     image,
  //     "600x320"
  //   )})`;
  // }

  return (
    <div className={"styles.treeDetails"} style={style}>
      {image && (
        <div className={"styles.treeImage"} style={inlineAvatarStyle} />
      )}
      <div className={"styles.closeButton"} onClick={() => closeDetails()}>
        <span>Close</span>
        <i className={"styles.close"} />
      </div>
      <div className={"styles.treeDetailsContent"}>
        <h1>{title}</h1>
        <RawHTML html={description} />
      </div>
    </div>
  );
};
