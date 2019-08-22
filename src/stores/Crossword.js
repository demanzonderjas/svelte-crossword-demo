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

	const handleWordCoords = (coords, answer) => {
		return update(grid => {
			coords.forEach(([row, column], index) => {
				grid[row][column] = answer[index];
			});
			return grid;
		});
	};

	const getAnswerString = coords => {
		return coords.map(([row, column]) => grid[row][column]).join("");
	};

	return {
		subscribe,
		handleInput,
		handleWordCoords,
		getAnswerString
	};
}

export const crossword = createCrosswordStore();
