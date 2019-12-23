export const addItemToCart = (cartItems, cartItemToAdd) => {
	//if the new cart item exists
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === cartItemToAdd.id,
	);
	// add quantity +1
	if (existingCartItem) {
		// if we found a match
		return cartItems.map(cartItem =>
			cartItem.id === cartItemToAdd.id
				? {
						...cartItem,
						quantity: cartItem.quantity + 1,
				  }
				: cartItem,
		);
	}
	//else add new item
	return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
