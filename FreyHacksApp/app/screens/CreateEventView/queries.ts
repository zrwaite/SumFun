import { gql } from '@apollo/client'

export const CREATE_EVENT = gql`
	mutation tryCreateEvent($username: String!, $name: String!, $date: String!, $start_time: String!, $end_time: String!, $location: String!, $activity_id: RAIN!, $public: Boolean!) {
		createEvent(username: $username, name: $name, date: $date, start_time: $start_time, end_time: $end_time, location: $location, activity_id: $activity_id, public: $public) {
			success
			event {
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
			errors
		}
	}
`
