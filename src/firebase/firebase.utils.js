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

	const userRef = firestore.doc(`users/${userAuth.uid}`); //use ref give the path of the collection or documents

	const snapShot = await userRef.get(); // snap shop gives the data which is provided by useref

	if (!snapShot.exists) {
		//--> if the data exist or not it's function provide by snapshot obj
		const { displayName, email } = userAuth; //--> i need the name and email to create a new user so I'll get that from the auth obj
		const createdAt = new Date(); //--> the user not exit this will create a new user
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

	return userRef; //--> else retun the useref obj
};

//-->storing shop data to firebase
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

export const convertCollectionsSnapshotToMap = collections => {
	const trnasformedCollection = collections.docs.map(doc => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items,
		};
	});

	//converting array to object using  a reduce function

	return trnasformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection; //each title rep a collection
		return accumulator;
	});
}; //--> this run for a sing time to store the shop data in the firestore

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); //--> sign in wil google
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
