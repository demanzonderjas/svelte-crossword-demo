import firebase from "firebase";
import "firebase/firestore";

export default function initDb() {
	firebase.initializeApp({
		apiKey: "AIzaSyAHFZu7aXeFw-Ce6aoi1ZQQnd97AEQBhTQ",
		authDomain: "puzzelorg-dev.firebaseapp.com",
		projectId: "puzzelorg-dev"
	});

	const db = firebase.firestore();

	db.collection("test")
		.add({
			done: true
		})
		.then(doc => console.log("doc id ::  ", doc.id))
		.catch(err => console.error("error adding doc", err));
}
