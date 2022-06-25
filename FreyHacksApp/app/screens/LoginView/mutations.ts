import { gql } from '@apollo/client'
import { DEFAULT_USER_DATA } from '../../../queries'

export const SIGNUP = gql`
	mutation trySignUp($username: String!, $password: String!) {
		createUser(username: $username, password: $password) {
			user {
				${DEFAULT_USER_DATA}
			}
			success
			errors
		}
	}
`
