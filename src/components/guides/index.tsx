import { Route, Routes } from "react-router-dom";

import GuidesHome from "./guides-home";
import CreateTree from "./create-tree";
import TreeEditor from "./tree-editor";
import CreateAndEditSims from "./create-and-edit-sims";
import PlacingSims from "./placing-sims";
import PublishTrees from "./publish-trees";
import LinkSims from "./link-sims";
import NotFound from "../not-found";

export default () => (
  <div className="container">
    <Routes>
      <Route path="/" element={<GuidesHome />} />
      <Route path="/create-a-tree" element={<CreateTree />} />
      <Route path="/tree-editor" element={<TreeEditor />} />
      <Route path="/create-and-edit-sims" element={<CreateAndEditSims />} />
      <Route path="/placing-sims" element={<PlacingSims />} />
      <Route path="/publising-trees" element={<PublishTrees />} />
      <Route path="/linking-sims-to-other-trees" element={<LinkSims />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </div>
);
