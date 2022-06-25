import { gql } from '@apollo/client'
import { DEFAULT_USER_DATA } from '../../../queries'

export const LOGIN = gql`
	query tryLogin($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			user {
				${DEFAULT_USER_DATA}
			}
			success
			errors
		}
	}
`
