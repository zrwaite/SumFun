import { gql } from '@apollo/client'

export const LIST_ACTIVITIES = gql`
	query tryListActivities {
		listActivities {
			activities {
				id
				name
				public
				verified
			}
			success
			errors
		}
}
`