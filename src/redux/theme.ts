import { Action } from 'redux';
import themes from '../themes';

const SET_THEME = 'SET_THEME';

export interface ThemeState {
	theme: keyof typeof themes;
}

export interface ThemeAction extends Action {
	theme: keyof typeof themes;
}

function getTheme(): keyof typeof themes {
	let theme = localStorage.getItem('theme');
	if (theme !== null && theme in themes) {
		return theme as keyof typeof themes;
	} else {
		return 'lightTheme';
	}
}

const initialThemeState = {
	theme: getTheme()
};

export const setTheme = (theme: string) => ({ type: SET_THEME, theme });

const themeReducer = (state: ThemeState = initialThemeState, action: ThemeAction) => {
	const { type, theme } = action;
	if (type === SET_THEME) {
		localStorage.setItem('theme', theme);
		return {
			...state,
			theme
		};
	} else {
		return state;
	}
};

export default themeReducer;
