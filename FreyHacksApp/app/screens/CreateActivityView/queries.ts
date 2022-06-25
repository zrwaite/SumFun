import { gql } from '@apollo/client'

export const CREATE_ACTIVITY = gql`
	mutation tryCreateActivity($username: String!, $name: String!, $min_temp: Int!, $max_temp: Int!, $min_wind: Int!, $max_wind: Int!, $rain: RAIN!) {
		createActivity(username: $username, name: $name, min_temp: $min_temp, max_temp: $max_temp, min_wind: $min_wind, max_wind: $max_wind, rain: $rain) {
			success
			activity {
				id
				name
				public
				verified
			}
			errors
		}
	}
`
