import { gql } from '@apollo/client'

export const LOGIN = gql`
	query tryGetUser($username: String!) {
		getUser(username: $username) {
			user {
				id
				display_name
			}
			success
			errors
		}
	}
`
