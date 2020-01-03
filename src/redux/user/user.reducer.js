import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
	currentUser: null, //--> user state null in the start
	//--> it returns null when the app load but ig the uer signed in
	//--> this will load the logged user as current user
	//--> this fires in componentDidmount in the app.js
};

const userReducer = (state = INITIAL_STATE, action) => {
	//--> typical
	switch (action.type) {
		case UserActionTypes.SET_CURRENT_USER: //--> if this dipatched `
			//--> returns an object
			return {
				...state, //--> push all the states "spreading"
				//--> if the user not signed in it's null else the user  object
				currentUser: action.payload, //-->then pusing the payload to crrent user
			};
		default:
			return state; //--> if the action not dispatched return the state
	}
};

export default userReducer;
