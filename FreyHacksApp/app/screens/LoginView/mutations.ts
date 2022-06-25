import { gql } from '@apollo/client'

export const SIGNUP = gql`
	mutation trySignUp($username: String!, $password: String!) {
		createUser(username: $username, password: $password) {
			user {
				id
				username
				activities {
					name
				}
				friends {
					username
					id
					display_name
				}
			}
			success
			errors
		}
	}
`
