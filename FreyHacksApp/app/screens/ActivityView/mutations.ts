import { gql } from '@apollo/client'

export const SUBSCRIBE = gql`
	mutation trySubscribe($id: ID!, $username: String!) {
		subscribeToActivity(id: $id, username: $username) {
			success
			errors
		}
	}
`
