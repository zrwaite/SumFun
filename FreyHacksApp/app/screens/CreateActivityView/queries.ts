import { gql } from '@apollo/client'

export const CREATE_ACTIVITY = gql`
	mutation tryCreateActivity($username: String!, $name: String!, $ideal_temp: Int!, $ideal_wind: Int!, $ideal_uvi: Int!, $ideal_visibility: Int!, $ideal_pop: Int!, $rain: RAIN!) {
		createActivity(username: $username, name: $name, ideal_temp: $ideal_temp, ideal_wind: $ideal_wind, ideal_uvi: $ideal_uvi, ideal_visibility: $ideal_visibility, ideal_pop: $ideal_pop, rain: $rain) {
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
