import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
	uri: 'http://localhost:5000'
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token');
	if (token !== undefined && token !== '') {
		return {
			headers: {
				...headers,
				authorization: token
			}
		};
	} else {
		return headers;
	}
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});

export default client;
