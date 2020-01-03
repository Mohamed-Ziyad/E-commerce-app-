export const addItemToCart = (cartItems, cartItemToAdd) => {
	//--> this is closure pattern
	//--> takes cartItems and new items
	//--> why this? because to save the items according to its catogory
	//--> stopping from repeating the items

	const existingCartItem = cartItems.find(
		//--> check the new item exist in the cart
		//--> typical javascrpt find function
		cartItem => cartItem.id === cartItemToAdd.id,
	);

	if (existingCartItem) {
		//--> here we are using function as a value "existingCartItem"
		//--> if the item exists
		return cartItems.map(
			(
				cartItem, //--> run a map in the cartitems
			) =>
				//--> if the Id matchs with new cart item
				cartItem.id === cartItemToAdd.id
					? { ...cartItem, quantity: cartItem.quantity + 1 } //--> add property call quantity and increase the quantity +1
					: cartItem, //--> else just leave it
		);
	}

	return [...cartItems, { ...cartItemToAdd, quantity: 1 }]; //--> if it's a new cart item first spread all the items, then add the new item, here
	//--> make sure the quantity: value = 1
};

//--> this util function for remove item from the cart
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	const existingCartItem = cartItems.find(
		//--> checking the existance of the removing item
		cartItem => cartItem.id === cartItemToRemove.id,
	);

	if (existingCartItem.quantity === 1) {
		//--> if the quantity = 1 filter the cartitems
		//--> return a new array without the cartItemToRemove
		return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
	}

	return cartItems.map(cartItem =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem,
	);
};
