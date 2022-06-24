import { ApolloClient, InMemoryCache } from '@apollo/client'
export const client = new ApolloClient({
	uri: 'http://172.20.10.10:8006/graphql',
	cache: new InMemoryCache(),
})
