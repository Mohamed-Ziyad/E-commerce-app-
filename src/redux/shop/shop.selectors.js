import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
	[selectShop],
	shop => shop.collections,
);

//==> objec to array convert

export const selectCollectionsForPreview = createSelector(
	[selectCollections],
	collections => Object.keys(collections).map(key => collections[key]),
	//--> it's js methode
);

export const selectCollection = collectionUrlParam =>
	createSelector(
		[selectCollections],
		collections => collections[collectionUrlParam],
	);
