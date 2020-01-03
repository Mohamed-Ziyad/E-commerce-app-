import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
	collections: null, //--> null in the start
};

const shopReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ShopActionTypes.UPDATE_COLLECTIONS:
			return {
				...state, //--> spreads all the state onces when shop component did mount
				collections: action.payload, //-->  the payload is the collections from the filestore firebase
			};
		default:
			return state;
	}
};

export default shopReducer;
