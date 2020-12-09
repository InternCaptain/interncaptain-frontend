import lightTheme from '../themes/lightTheme';
import { Theme } from '@material-ui/core';

const SET_THEME = 'SET_THEME';

export interface ThemeState {
	theme: Theme;
}

const initialThemeState = {
	theme: lightTheme
};

export const setTheme = (theme: Theme) => ({ type: SET_THEME, theme });

const themeReducer = (state = initialThemeState, action: any) => {
	const { type, theme } = action;
	if (type === SET_THEME) {
		return {
			...state,
			theme: { ...theme }
		};
	} else {
		return state;
	}
};

export default themeReducer;
