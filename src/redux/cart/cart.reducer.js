import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils'; //-->utils functions

const INITIAL_STATE = {
	hidden: true, //--> to toggle cart
	cartItems: [], //--> empty cart
};

const cartReducer = (state = INITIAL_STATE, action) => {
	//--> typical
	switch (action.type) {
		case CartActionTypes.TOGGLE_CART_HIDDEN: //--> when this dispatches it toggles the cart
			return {
				...state, //-->spread all the state
				hidden: !state.hidden, //--> only change the state of the hidden bool toggles the cart
			};
		case CartActionTypes.ADD_ITEM: //--> when this dispatches it will add items to the  cart
			return {
				...state, //--> spreads the state
				cartItems: addItemToCart(state.cartItems, action.payload), //--> adds item by grouping :-this is a util function take cartItems and new item
			};
		case CartActionTypes.REMOVE_ITEM: //--> this will remove items from cart
			return {
				...state,
				cartItems: removeItemFromCart(state.cartItems, action.payload), //--> removes items :- this is a util function take cartItems and new item
			};
		case CartActionTypes.CLEAR_ITEM_FROM_CART: //--> celar items from cart
			return {
				...state, //--> spreads the state
				cartItems: state.cartItems.filter(
					cartItem => cartItem.id !== action.payload.id, //--> typical filter method to remove item
				),
			};
		default:
			return state;
	}
};

export default cartReducer;
