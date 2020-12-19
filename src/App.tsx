import React from 'react';
import Routes from './routes/Routes';
import { Provider as StoreProvider } from 'react-redux';
import store from './redux/store';
import ThemedApp from './widgets/ThemedApp';

const AppContainer = () => {
	return (
		<StoreProvider store={store}>
			<ThemedApp>
				<Routes />
			</ThemedApp>
		</StoreProvider>
	);
};

export default AppContainer;
