import { gql } from '@apollo/client'

export const LIST_EVENTS = gql`
	query tryListEvents {
		listEvents {
			events {
				id
				name
				date
				start_time
				lon
				lat
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