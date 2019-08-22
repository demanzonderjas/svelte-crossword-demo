import data from "../data/config.json";
import firebase from "firebase";
import "firebase/firestore";
import { writable } from "svelte/store";

export const multiplayer = writable({
	db: null,
	user: null,
	game_uid: null
});

export function initMultiplayer() {
	firebase.initializeApp({
		apiKey: "AIzaSyAHFZu7aXeFw-Ce6aoi1ZQQnd97AEQBhTQ",
		authDomain: "puzzelorg-dev.firebaseapp.com",
		projectId: "puzzelorg-dev"
	});

	const db = firebase.firestore();
	firebase
		.auth()
		.signInAnonymously()
		.catch(console.error);

	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			console.log("user :: ", user);
			multiplayer.set({
				db,
				user,
				game_uid: data.game_uid
			});
		}
	});
}
