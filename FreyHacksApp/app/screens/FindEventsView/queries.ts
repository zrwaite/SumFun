import { gql } from '@apollo/client'

export const LIST_EVENTS = gql`
	query tryListEvents {
		listEvents {
			events {
				id
				name
				date
				start_time
				location
				end_time
				activity {
					name
					id
					verified
					public
				}
			}
			success
			errors
		}
}
`