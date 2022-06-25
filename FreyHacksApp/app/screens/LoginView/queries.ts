import { gql } from '@apollo/client'

export const LOGIN = gql`
	query tryLogin($username: String!, $password: String!) {
		login(username: $username, password: $password) {
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
				events {
					name
					date
					start_time
					duration
					location
				}
			}
			success
			errors
		}
	}
`
