import { activeWord } from "./ActiveWord";
import { writable } from "svelte/store";
import { words } from "./Words";
import { crossword } from "./Crossword";
import { validate } from "./validators/correct.js";
import { multiplayer } from "./Multiplayer";

let words_value;
words.subscribe(val => {
	words_value = val;
});

let multiplayerConn = null;
multiplayer.subscribe(val => {
	console.log("new multiplayer connection was set :: ", val);
	multiplayerConn = val;

	if (multiplayerConn.db) {
		multiplayerConn.db
			.collection("games")
			.doc(multiplayerConn.game_uid)
			.onSnapshot(doc => addMultiplayerAnswers(doc.data()));
	}
});

function addMultiplayerAnswers(game) {
	if (!game) {
		return;
	}
	const answers = game.answers.map(word => ({
		data: words_value.find(w => w.uid == word.uid),
		string: word.string
	}));
	correctAnswers.set(answers.map(a => a.data));
	answers.forEach(answer => {
		crossword.handleWordCoords(answer.data.coords, answer.string);
	});
}

export const correctAnswers = writable([]);

function addOwnCorrectAnswer(activeWord) {
	correctAnswers.update(answers => {
		if (answers.some(a => a.uid == activeWord.uid)) {
			return answers;
		}

		const newAnswers = [...answers, activeWord];
		if (multiplayerConn && multiplayerConn.game_uid) {
			saveAsMultiplayerAnswers(newAnswers);
		}

		return newAnswers;
	});
}

function saveAsMultiplayerAnswers(answers) {
	const mappedAnswers = answers.map(a => ({
		uid: a.uid,
		string: crossword.getAnswerString(a.coords)
	}));
	multiplayerConn.db
		.collection("games")
		.doc(multiplayerConn.game_uid)
		.set({
			answers: mappedAnswers
		});
}

activeWord.subscribe(val => {
	const { isCorrect, activeWord } = validate(val);
	if (isCorrect) {
		addOwnCorrectAnswer(activeWord);
	}
});
