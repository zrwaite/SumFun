import { gql } from '@apollo/client'

export const REGISTER = gql`
	mutation tryRegister($id: ID!, $username: String!) {
		registerForEvent(id: $id, username: $username) {
			success
			errors
		}
	}
`
