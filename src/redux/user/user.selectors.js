import { createSelector } from 'reselect';

const selectUser = state => state.user; //--> selec the user state
//--> it's one layer deep

export const selectCurrentUser = createSelector(
	//to select the current user
	[selectUser], //this is the input selector
	user => user.currentUser, // from it we are out puting current user selector
	//--> here it's two layers deep
);
