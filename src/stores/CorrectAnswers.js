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
			.onSnapshot(doc => {
				const game = doc.data();
				if (!game) {
					return;
				}
				const answers = game.answers.map(word => ({
					data: words_value.find(w => w.uid == word.uid),
					string: word.string
				}));
				correctAnswers.set(answers.map(a => a.data));
				answers.forEach(answer => {
					crossword.handleWordCoords(
						answer.data.coords,
						answer.string
					);
				});
			});
	}
});

export const correctAnswers = writable([]);

activeWord.subscribe(val => {
	const { isCorrect, activeWord } = validate(val);
	if (isCorrect) {
		correctAnswers.update(answers => {
			if (answers.some(a => a.uid == activeWord.uid)) {
				return answers;
			}

			const newAnswers = [...answers, activeWord];
			const mappedAnswers = newAnswers.map(a => ({
				uid: a.uid,
				string: crossword.getAnswerString(a.coords)
			}));

			if (multiplayerConn) {
				multiplayerConn.db
					.collection("games")
					.doc(multiplayerConn.game_uid)
					.set({
						answers: mappedAnswers
					});
			}

			return newAnswers;
		});
	}
});
