import { Link } from "react-router-dom";

// .navList {
//   list-style: none;
//   padding: 0px;
//   margin: 0px;
//   font-size: 17px;

//   li {
//     border-bottom: 1px solid #E6EAEA;
//     padding: 0px;

//     a {
//       display: block;
//       text-decoration: none;
//       padding: 24px 36px;
//       color: $font-color;
//       font-weight: bold;
//       transition: background 0.2s ease-in-out;

//       &:hover {
//         background: #fff;
//       }
//     }
//   }

//   &.lastNav {
//     margin-bottom: 60px;
//   }
// }

// .navTreesHeader {
//   padding: 24px 36px;
//   font-size: 17px;
//   color: #12CBC4;
//   border-bottom: 1px solid #E6EAEA;
//   font-weight: 400;
// }

// .menuLoginMessage {
//   margin: 0px;
//   padding: 20px;
//   text-align: center;
// }

export default ({ onItemClick }: { onItemClick: () => void }) => {
  const trees: any[] = [];

  return (
    <div>
      <ul className={"styles.navList"}>
        <li>
          <Link to="/" onClick={onItemClick}>
            Home
          </Link>
        </li>
      </ul>

      <div className={"styles.navTreesHeader"}>Your Trees</div>

      <ul className={["styles.navList", "styles.lastNav"].join(" ")}>
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
