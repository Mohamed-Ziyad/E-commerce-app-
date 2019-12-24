import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'; //--> this will give the ability to destructure the selector
//--> without passing the state obj
import { auth } from '../../firebase/firebase.util';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { selectCartHidden } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';

import './header.style.scss';

const Header = ({ currentUser, hidden }) => (
	<div className="header">
		<Link className="logo-container" to="/">
			<Logo className="logo" />
		</Link>
		<div className="options">
			<Link className="option" to="/shop">
				SHOP
			</Link>
			<Link className="option" to="/shop">
				CONTACT
			</Link>

			{currentUser ? (
				<div className="option" onClick={() => auth.signOut()}>
					SIGN OUT
				</div>
			) : (
				<Link className="option" to="/signin">
					SIGN IN
				</Link>
			)}
			<CartIcon />
		</div>
		{hidden ? null : <CartDropDown />}
	</div>
);

const mapStateToProps = createStructuredSelector({
	//-->currentUser: state.user.currentUser, typical way
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
