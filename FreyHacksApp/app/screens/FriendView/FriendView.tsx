import { useState } from 'react'
import { StyleSheet, View, Text, Alert, ActivityIndicator } from 'react-native'
import { client } from '../../../client'
import { COLORS } from '../../settings'
import { GET_FRIEND } from './queries'

export const FriendView = ({ route }: { route: { params: { friend: NestedUser } } }) => {
	const [friendState, setFriendState] = useState<'LOADING' | 'NOT_FOUND' | 'FOUND'>('LOADING')
	const [friend, setFriend] = useState<User|null>(null)
	const tryGetFriend = async () => {
		const response = await client.query({
			query: GET_FRIEND,
			variables: { username: route.params.friend.username },
		})
		if (!response.error) {
			const data = response.data
			if (data.getUser.success) {
				setFriend(data.getUser.user)
			} else {
				Alert.alert('Error', JSON.stringify(data.getUser.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
				setFriendState('NOT_FOUND')
			}
		} else Alert.alert('Error', JSON.stringify(response.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
		setFriendState('FOUND')
	}
	if (friendState === 'LOADING') {
		tryGetFriend()
	}
	return (
		<View style={styles.container}>
			{friendState==='LOADING' && (<>
				<Text>Loading...</Text>
				<ActivityIndicator size="large" />
			</>)}
			{friendState==='NOT_FOUND' && (<>
				<Text>Friend not found. Oof</Text>
			</>)}
			{friendState==='FOUND' && (<>
				<Text style={styles.header}>{friend?.username}</Text>
				<Text>{friend?.display_name}</Text>
				<Text>Activities:</Text>
				{friend?.activities.map((activity, i) => {
					return <Text key={i}>{activity?.name}</Text>
				})}
			</>)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.blue,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop: 20,
	},
	header: {
		color: 'black',
		fontSize: 40,
		textAlign: 'center',
	},
})