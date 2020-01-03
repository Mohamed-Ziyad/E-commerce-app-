import { UserActionTypes } from './user.types';

export const setCurrentUser = user => ({
	//--> setting current user from auth
	//here the payload is the user
	type: UserActionTypes.SET_CURRENT_USER,
	payload: user,
});
