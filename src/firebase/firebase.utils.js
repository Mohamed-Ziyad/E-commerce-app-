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

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

//--storing shop data to firebase
export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
	const collectionRef = firestore.collection(collectionKey);

	//--> batch wirte storing big file into database
	const batch = firestore.batch();
	objectToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
