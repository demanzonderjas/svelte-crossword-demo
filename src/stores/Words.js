import data from "../data/config.json";
import { readable } from "svelte/store";

export const words = readable(data.words);
