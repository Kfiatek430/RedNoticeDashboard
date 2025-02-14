import { writable } from "svelte/store";
import type { BasicNotice } from "../types/BasicNotice";

export const searchQuery = writable<BasicNotice[]>([]);