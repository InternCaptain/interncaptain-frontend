import { CssBaseline, Theme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import Routes from './routes/Routes';
import AppState from './redux/AppState';
import { connect, Provider as StoreProvider } from 'react-redux';
import store from './redux/store';
import themes from './themes';

const App = (properties: { theme: Theme }) => (
	<ThemeProvider theme={properties.theme}>
		<CssBaseline />
		<Routes />
	</ThemeProvider>
);

const mapStateToProps = (state: AppState) => ({
	theme: themes[state.themeState.theme]
});

const ThemedApp = connect(mapStateToProps)(App);

const AppContainer = () => {
	return (
		<StoreProvider store={store}>
			<ThemedApp />
		</StoreProvider>
	);
};

export default AppContainer;
