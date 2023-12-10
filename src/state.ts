import { computed, signal } from "@preact/signals-react";

import data from "./api/data.json";
import { updateTreeState } from "./api/tree";
import { Data, NodeData } from "./types";

export const preview = signal(false);
export const tree = signal<Data>(data as Data);
export const nodeToEdit = signal<NodeData | null>(null);

export const treeNodes = computed(() => updateTreeState(tree.value.tree));
export const treeLinks = computed(() => treeNodes.value.slice(1));
