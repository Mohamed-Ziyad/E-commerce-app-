import React from 'react';
import StripeCheckout from 'react-stripe-checkout'; //--> this from react stripe component

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_Cw8GUKwrRhzeMeiYYgqZ4pbj00fr534XLc';

	const onToken = token => {
		console.log(token);
		alert('Payment Successful');
	};

	return (
		<StripeCheckout
			label="Pay Now"
			name="CRWN Clothing"
			billingAddress
			shippingAddress
			image="https://sendeyo.com/up/d/f3eb2117da"
			description={`Your total is $${price} `}
			amount={priceForStripe}
			panelLabel="Pay Now"
			token={onToken} //--> this goes to backend for now just alert
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
