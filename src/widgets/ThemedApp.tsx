import { CssBaseline, Theme, ThemeProvider } from '@material-ui/core';
import AppState from '../redux/AppState';
import themes from '../themes';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';

interface ThemedAppProperties {
	theme: Theme;
}

const ThemedApp: React.FC<ThemedAppProperties> = (properties) => {
	const { children } = properties;

	const [theme, setTheme] = useState(properties.theme);

	useEffect(() => {
		setTheme(properties.theme);
	}, [properties.theme]);

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
