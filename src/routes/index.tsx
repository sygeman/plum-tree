import { Link } from "react-router-dom";

export const IndexPage = () => {
  const treeId = "641f24449a150cba09f92d5b";

  return (
    <div>
      <h1>Trees List</h1>
      <div className="flex flex-col">
        <Link to={`/trees/${treeId}`}>Test Tree</Link>
        <Link to="/trees/create">Create Tree</Link>
      </div>
    </div>
  );
};
