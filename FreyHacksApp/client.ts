import { ApolloClient, InMemoryCache } from '@apollo/client'
export const client = new ApolloClient({
	uri: 'http://sum-fun.xyz/graphql',
	cache: new InMemoryCache(),
})
