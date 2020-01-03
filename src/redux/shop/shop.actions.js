import ShopActionTypes from './shop.types';

export const updateCollections = collectionsMap => ({
	//-->update collections action creator  collectionMap is a object return from fireabse collections snap shot
	//--> collection is the payload
	//--> to update the shop items
	type: ShopActionTypes.UPDATE_COLLECTIONS,
	payload: collectionsMap,
});
