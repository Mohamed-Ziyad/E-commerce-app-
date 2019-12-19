import React, { Component } from 'react';

import { auth, signInWithGoogle } from '../../firebase/firebase.util';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.style.scss';

export default class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};
	}
	handleSubmit = async event => {
		event.preventDefault();

		const { email, password } = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({ email: '', password: '' });
		} catch (error) {
			console.log(error);
		}
	};

	handleChange = event => {
		const { value, name } = event.target; //the name and the value of the input field
		//=> no need to create separate fnctions

		this.setState({ [name]: value });
	};

	render() {
		return (
			<div className="sign-in">
				<h2>I already have an account</h2>
				<span>Sign in with your email and password</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput
						name="email"
						type="email"
						value={this.state.email}
						handleChange={this.handleChange}
						label="Email"
					/>

					<FormInput
						name="password"
						type="password"
						value={this.state.password}
						handleChange={this.handleChange}
						label="password"
					/>

					<div className="buttons">
						<CustomButton type="submit">Sign In</CustomButton>

						<CustomButton onClick={signInWithGoogle} isGoogleSignIn>
							Sign in with Google
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}
