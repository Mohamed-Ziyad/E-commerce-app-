import { createSelector } from 'reselect';
//this thing select the state form it's component

const selectCart = state => state.cart; //one layer deep from state obj

export const selectCartItems = createSelector(
	//two layers deep
	[selectCart], //==> input selector
	cart => cart.cartItems, //==> output selector
);

export const selectCartHidden = createSelector(
	[selectCart],
	cart => cart.hidden,
);

export const selectCartItemsCount = createSelector(
	//three layers deep
	[selectCartItems],
	cartItems =>
		cartItems.reduce(
			(accumalatedQuantity, cartItem) =>
				accumalatedQuantity + cartItem.quantity,
			0,
		),
);

export const selectCartTotal = createSelector(
	//three layers deep
	[selectCartItems],
	cartItems =>
		cartItems.reduce(
			(accumalatedQuantity, cartItem) =>
				accumalatedQuantity + cartItem.quantity * cartItem.price,
			0,
		),
);
