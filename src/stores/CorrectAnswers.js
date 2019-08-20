import { activeWord } from "./ActiveWord";
import { writable } from "svelte/store";
import { validate } from "./validators/correct.js";

export const correctAnswers = writable([]);

activeWord.subscribe(val => {
	const { isCorrect, activeWord } = validate(val);
	if (isCorrect) {
		correctAnswers.update(answers => [...answers, activeWord]);
	}
});
