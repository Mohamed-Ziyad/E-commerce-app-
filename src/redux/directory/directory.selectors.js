import { createSelector } from 'reselect';

const selectDirectory = state => state.directory; //--> select the directory state

export const selectDirectorySections = createSelector(
	[selectDirectory], //--> input directory selector
	directory => directory.sections, //--> out put the sections selector
);
