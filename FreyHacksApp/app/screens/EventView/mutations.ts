import { gql } from '@apollo/client'

export const REGISTER = gql`
	mutation tryRegister($id: ID!, $username: String!) {
		registerForEvent(id: $id, username: $username) {
			success
			errors
		}
	}
`

export const UNREGISTER = gql`
	mutation tryUnRegister($id: ID!, $username: String!) {
		unregisterFromEvent(id: $id, username: $username) {
			success
			errors
		}
	}
`
