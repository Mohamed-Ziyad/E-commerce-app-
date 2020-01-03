import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
	//--> no payload only toggles
	type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = item => ({
	//--> item is the payload to add
	type: CartActionTypes.ADD_ITEM,
	payload: item,
});

export const removeItem = item => ({
	//--> item is the payload to remove
	type: CartActionTypes.REMOVE_ITEM,
	payload: item,
});

export const clearItemFromCart = item => ({
	//--> item is the payload to clear
	type: CartActionTypes.CLEAR_ITEM_FROM_CART,
	payload: item,
});
