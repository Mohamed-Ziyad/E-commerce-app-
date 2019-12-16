import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { auth } from './firebase/firebase.util';

import './App.css';

import HomePage from './pages/home-page/hompage.compoment';
import ShopPage from './pages/shop-page/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUser: null,
		};
	}

	//closing subscription or connection from firebase
	unsubscribeFromAuth = null;

	componentDidMount() {
		//auth is the subscriber that's connected with firebase
		//open subscription
		//between app and the firebase
		this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
			//from firebase user object
			//this triggers until user signout
			//this fires each the user sign in or sign out
			this.setState({ currentUser: user });
			console.log(user);
		});
	}

	//--> this will remove the subscriptions
	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		const { currentUser } = this.state;

		return (
			<div>
				<Header currentUser={currentUser} />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route path="/signin" component={SignInAndSignUp} />
				</Switch>
			</div>
		);
	}
}

export default App;
