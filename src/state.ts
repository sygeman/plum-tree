import { computed, signal } from "@preact/signals-react";

import data from "./api/data-641f24449a150cba09f92d5b.json";
import { updateTreeState } from "./api/tree";

export const preview = signal(false);
export const tree = signal(data);
export const nodeToEdit = signal(null);

export const treeNodes = computed(() => updateTreeState(tree.value.data));
export const treeLinks = computed(() => treeNodes.value.slice(1));
