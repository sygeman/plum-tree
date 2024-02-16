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
}

export type TreeNode = {
  children?: TreeNode[];
  partners?: {
    people: string[];
    type: PartnerType;
  }[];
  person: string;
};

export type Data = {
  _id: string;
  lastPublishDate: string;
  people: People[];
  title: string;
  tree: TreeNode;
};

export type PeopleExtended = People & {
  childen: Set<{ id: string }>;
  parents: Set<{ id: string }>;
  partners: Set<{ id: string; partner: PeopleExtended; type: string }>;
};
