import { StyleSheet, View, Text } from 'react-native'
import { COLORS } from '../../settings'

export const FriendView = ({ route }: { route: { params: { friend: User } } }) => {
	const friend = route.params.friend
	return (
		<View style={styles.container}>
			<Text style={styles.header}>{friend.username}</Text>
			<Text>{friend.display_name}</Text>
			<Text>Activities:</Text>
			{friend.activities.map((activity, i) => {
				return <Text key={i}>{activity?.name}</Text>
			})}
			<Text>Events:</Text>
			{friend.events.map((event, i) => {
				return <Text key={i}>{event?.name}</Text>
			})}
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