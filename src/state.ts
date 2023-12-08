import { signal } from "@preact/signals-react";

import data from "./api/data-641f24449a150cba09f92d5b.json";

export const preview = signal(false);
export const tree = signal(data);
export const nodeToEdit = signal(null);
