import { crossword } from "../Crossword";
import { orientation } from "../Orientation";

let grid, orientation_value;

crossword.subscribe(val => (grid = val));
orientation.subscribe(val => (orientation_value = val));

export function validate(prevFocus, nextFocus, newOrientation, config) {
	if (!grid[nextFocus.row]) {
		return withConfig(prevFocus, config);
	}

	if (grid[nextFocus.row][nextFocus.column] === undefined) {
		return withConfig(prevFocus, config);
	}

	if (grid[nextFocus.row][nextFocus.column] === "@") {
		return withConfig(prevFocus, config);
	}

	if (newOrientation != orientation_value) {
		orientation.set(newOrientation);
	}

	return withConfig(nextFocus, config);
}

function withConfig(obj, config) {
	return { ...obj, ...config };
}
