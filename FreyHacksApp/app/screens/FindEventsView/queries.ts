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
        duration
        activity_id
			}
			success
			errors
		}
}
`