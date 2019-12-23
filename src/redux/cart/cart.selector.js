import { createSelector } from 'reselect';

const selectCart = state => state.cart; //one layer deep from state obj

export const selectCartItems = createSelector(
	//two layers deep
	[selectCart], //==> input selector
	cart => cart.cartItems, //==> output selector
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
