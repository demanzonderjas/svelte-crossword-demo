import { hashString } from "../utils/hashString.js";
import { crossword } from "../Crossword";

let grid;
crossword.subscribe(val => (grid = val));

export function validate(activeWord) {
	const answerString = activeWord.coords.reduce((base, next) => {
		return base + grid[next[0]][next[1]];
	}, "");

	const isCorrect = activeWord.answer == hashString(answerString);

	return { isCorrect, activeWord };
}
