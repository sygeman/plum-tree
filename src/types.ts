import { HierarchyPointNode } from "d3-hierarchy";

export type People = {
  avatar: string;
  firstName: string;
  id: string;
  lastName: string;
};

export enum PartnerType {
  ABDUCTION = "ABDUCTION",
  EX_PARTNER = "EX_PARTNER",
  MARRIED = "MARRIED",
  PARTNER = "PARTNER",
}

export type Partner = {
  people: string[];
  type: PartnerType;
};

export type TreeNode = {
  children?: TreeNode[];
  partners?: Partner[];
  person: string;
};

export type Data = {
  _id: string;
  people: People[];
  title: string;
  tree: TreeNode;
};

export type NodeData = HierarchyPointNode<TreeNode>;
