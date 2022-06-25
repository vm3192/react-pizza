import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyAAGXNU0t2_3k-g2vgSPzqYjjLMc-brwcQ",
	authDomain: "react-pizza-76af9.firebaseapp.com",
	databaseURL:
		"https://react-pizza-76af9-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "react-pizza-76af9",
	storageBucket: "react-pizza-76af9.appspot.com",
	messagingSenderId: "1070505151669",
	appId: "1:1070505151669:web:2677de839dd0bb1cdd82fc",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
