import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; // to use history push for route

import './cart-dropdown.style.scss';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import { selectCartItems } from '../../redux/cart/cart.selector';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartDropDown = ({ cartItems, history, dispatch }) => {
	// history props comes from react-router-dom
	return (
		<div className="cart-dropdown">
			<div className="cart-items">
				{cartItems.length ? (
					cartItems.map(cartItem => (
						<CartItem key={cartItem.id} item={cartItem} />
					))
				) : (
					<span className="empty-message">Your cart is empty</span>
				)}
			</div>

			<CustomButton
				onClick={() => {
					history.push('/checkout');
					dispatch(toggleCartHidden()); //--> here we are not using mapdispatchtoprops
					//==> this action fires using dispatch
				}}
			>
				GO TO CHECKOUT
			</CustomButton>
		</div>
	);
};

const mapStateToProps = state => ({
	//--> I'm using the tycal way
	cartItems: selectCartItems(state), // stopping rerenders using selectors
	//here I'm not using create structured selector from reselect
});

//const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps)(CartDropDown)); //if we not pass the mapdispatchto props
//connect dispatch  as pass as a prop
