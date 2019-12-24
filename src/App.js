import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import { selectCurrentUser } from './redux/user/user.selector';
import { auth, createUserProfileDocument } from './firebase/firebase.util';
import HomePage from './pages/home-page/hompage.compoment';
import ShopPage from './pages/shop-page/shop.component';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout-page/checkout.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { setCurrentUser } from './redux/user/user.action';

class App extends React.Component {
	//closing subscription or connection from firebase
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;
		//auth is the subscriber that's connected with firebase
		//open subscription
		//between app and the firebase
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			//from firebase user object
			//this triggers until user signout
			//this fires each the user sign in or sign out
			//-->this.setState({ currentUser: user });
			//-->	console.log(user);
			//-->createUserProfileDocument(user);

			//==>> if suerAuth exists
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth); //crete userr profile if not exists

				userRef.onSnapshot(snapshot => {
					//setting the snapshot data to state obj

					setCurrentUser({
						id: snapshot.id,
						...snapshot.data(),
					});
				});
			}

			setCurrentUser(userAuth);
		});
	}

	//--> this will remove the subscriptions
	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route exact path="/checkout" component={CheckoutPage} />
					<Route
						exact
						path="/signin"
						render={() =>
							//--> it's a conitional render in ruote
							//--if user signed in redirectto home else show the signinandsingup page
							this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
						}
					/>
				</Switch>
			</div>
		);
	}
}
//this.state.user ===> destructured
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
