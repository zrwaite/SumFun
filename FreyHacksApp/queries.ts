import { gql } from '@apollo/client'

export const DEFAULT_USER_DATA = `
	id
	username
	activities {
		id
		name
		verified
		public
	}
	friends {
		username
		id
		activities {
			id
			name
			verified
			public
		}
		display_name
		events {
			id
			name
		}
	}
	events {
		name
		date
		start_time
		end_time
		location
		activity {
			id
			name
			verified
			public
		}
	}
`

export const GET_USER = gql`
	query tryGetUser($username: String!) {
		getUser(username: $username) {
			user {
				${DEFAULT_USER_DATA}
			}
			success
			errors
		}
	}
`
