import data from "../data/config.json";
import { derived } from "svelte/store";
import { focus } from "./Focus";
import { orientation } from "./Orientation";

let orientation_value;
orientation.subscribe(val => (orientation_value = val));

export const activeWord = derived(focus, $focus => {
	const { row, column, isNav } = $focus;
	const matchingWordWithStartCoords = data.words.find(
		word => word.startY == row && word.startX == column
	);

	if (matchingWordWithStartCoords && isNav) {
		return matchingWordWithStartCoords;
	}

	const matchingWordWithOrientation = data.words.find(
		word =>
			word.coords.some(c => c[0] == row && c[1] == column) &&
			word.orientation == orientation_value
	);

	if (matchingWordWithOrientation) {
		return matchingWordWithOrientation;
	}
	const matchingWord = data.words.find(word =>
		word.coords.some(c => c[0] == row && c[1] == column)
	);
	orientation.set(matchingWord.orientation);
	return matchingWord;
});
