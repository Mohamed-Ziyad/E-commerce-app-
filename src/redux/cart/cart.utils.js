export const addItemToCart = (cartItems, cartItemToAdd) => {
	//if the new cart item exists
	//grouping item with same id
	//increase the quantity
	//adding a quntity attribute
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

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	const existingCartItem = cartItems.find(
		//--> if item exists

		cartItem => cartItem.id === cartItemToRemove.id,
	);

	if (existingCartItem.quantity === 1) {
		return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
	} //--> if the existing item equal one remove the item

	return cartItems.map((
		cartItem, //else just decrease the quantity
	) =>
		cartItem.id === cartItemToRemove.id // if id matches
			? {
					...cartItem, //keep all the cart items
					quantity: cartItem.quantity - 1, //but detuct the quantity
			  }
			: cartItem,
	);
};
