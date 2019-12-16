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

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); //type of authentication here it's google
provider.setCustomParameters({ prompt: 'select_account' }); //only selectin the account

export const signInWithGoogle = () => auth.signInWithPopup(provider); //the google popup is displayed
//==> to sign in

export default firebase;
