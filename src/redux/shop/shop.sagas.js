import { takeLatest, all, call, put } from 'redux-saga/effects';

import {
	firestore,
	convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

import {
	fetchCollectionsSuccess,
	fetchCollectionsFailure,
} from './shop.actions';

import ShopActionTypes from './shop.types';

function* fetchCollectionsAsync() {
	//yield console.log('I am fired'); //-->yield makes the function pause

	try {
		//--> this is how the data fetches from firebase
		const collectionRef = firestore.collection('collections');
		const snapshot = yield collectionRef.get();
		const collectionsMap = yield call(
			//-->calling the collection and converting to objects
			convertCollectionsSnapshotToMap,
			snapshot,
		);

		//--> put is the dispatch
		yield put(fetchCollectionsSuccess(collectionsMap));
	} catch (error) {
		yield put(fetchCollectionsFailure(error.message));
	}
}
export function* fetchCollectionsStart() {
	yield takeLatest(
		//--> take the latest data
		ShopActionTypes.FETCH_COLLECTIONS_START,
		fetchCollectionsAsync,
	);
}

export function* shopSagas() {
	yield all([call(fetchCollectionsStart)]);
}
