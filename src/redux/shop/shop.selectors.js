import { createSelector } from 'reselect';

const selectShop = state => state.shop; //--> select the shop data using this selector

export const selectCollections = createSelector(
	//--> this is for the collections
	[selectShop], //--> input selector shop
	shop => shop.collections, //--> out put collections
);

export const selectCollectionsForPreview = createSelector(
	//--> this selector for previrew items in the shop component
	[selectCollections], //--> it takes collections as input selector
	(
		collections, //--> coverting objects to array
	) =>
		collections ? Object.keys(collections).map(key => collections[key]) : [], //--> until the data loads the array is empty else convert the object to array, it's javascript
);

export const selectCollection = (
	collectionUrlParam, //--> this is a curring function pattern the function execute one by one
) =>
	//--> I have learn a advance js course to get know this,
	//-->this for the collection category
	//--> collectionUrlParam it the value to sort the collection according to it's respective category
	//--> here the data is normalized that means the app getting a object not an array
	//--> i have to learn DSAA in js to understand this
	createSelector(
		[selectCollections], //--> collection is the input selector
		collections => (collections ? collections[collectionUrlParam] : null), //--> until the data load collections is null else according to the collection param display the sorted item
	);
