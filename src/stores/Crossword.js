import { writable } from "svelte/store";
import data from "../data/config.json";
import { resetGrid } from "./utils/resetGrid";

function createCrosswordStore() {
	const grid = resetGrid(data.grid);
	const { subscribe, update } = writable(grid);

	const handleInput = (row, column, e) => {
		return update(grid => {
			grid[row][column] = e.data;
			return grid;
		});
	};

	return {
		subscribe,
		handleInput
	};
}

export const crossword = createCrosswordStore();
