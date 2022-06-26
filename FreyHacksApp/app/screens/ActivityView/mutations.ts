import { gql } from '@apollo/client'

export const SUBSCRIBE = gql`
	mutation trySubscribe($id: ID!, $username: String!) {
		subscribeToActivity(id: $id, username: $username) {
			success
			errors
		}
	}
`

export const UNSUBSCRIBE = gql`
	mutation tryUnSubscribe($id: ID!, $username: String!) {
		unsubscribeFromActivity(id: $id, username: $username) {
			success
			errors
		}
	}
`
