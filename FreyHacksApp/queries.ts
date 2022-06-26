import { gql } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { client } from './client'

export const tryGetSetUser = async (setUser:(newUser:User)=>void):Promise<400|404|200> => {
	const username = await AsyncStorage.getItem('username')
	if (!username) {
		return 404
	}
	const response = await client.query({
		query: GET_USER,
		variables: { username },
	})
	if (!response.error) {
		const data = response.data
		if (data.getUser.success) {
			setUser(data.getUser.user)
			return 200
		} else Alert.alert('Error', JSON.stringify(data.getUser.errors), [{ text: 'OK'  }])
	} else Alert.alert('Error', JSON.stringify(response.errors), [{ text: 'OK'  }])
	return 400
}

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
	activity_ids
	events {
		id
		name
		date
		start_time
		end_time
		lat
		lon
		activity {
			id
			name
			verified
			public
		}
	}
	event_ids
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
