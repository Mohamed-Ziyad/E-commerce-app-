import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyCoVhIqPpRDqRdz5JwEprh2KnuVPgzi5pM',
	authDomain: 'crwn-db-639c8.firebaseapp.com',
	databaseURL: 'https://crwn-db-639c8.firebaseio.com',
	projectId: 'crwn-db-639c8',
	storageBucket: 'crwn-db-639c8.appspot.com',
	messagingSenderId: '356044249309',
	appId: '1:356044249309:web:6c17ae32486149ead62334',
	measurementId: 'G-29RZ6XGPD4',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return; // if null do nothing

	const userRef = firestore.doc(`users/${userAuth.uid}`); // the document Id

	const snapShot = await userRef.get(); //get the data

	//--> if the data exists do nothing but if not write a new user by getting the data from
	// auth obj

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			// sets the data save to firestore
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('error create user', error.message);
		}
	}

	return userRef; // for somthing
};

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); //type of authentication here it's google
provider.setCustomParameters({ prompt: 'select_account' }); //only selectin the account

export const signInWithGoogle = () => auth.signInWithPopup(provider); //the google popup is displayed
//==> to sign in

export default firebase;
