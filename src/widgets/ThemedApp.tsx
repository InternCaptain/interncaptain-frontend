import { CssBaseline, Theme, ThemeProvider } from '@material-ui/core';
import AppState from '../redux/AppState';
import themes from '../themes';
import { connect } from 'react-redux';
import React from 'react';

interface ThemedAppProperties {
	theme: Theme;
}

const ThemedApp: React.FC<ThemedAppProperties> = (properties) => {
	const { theme, children } = properties;
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

const mapStateToProps = (state: AppState) => ({
	theme: themes[state.themeState.theme]
});

export default connect(mapStateToProps)(ThemedApp);
