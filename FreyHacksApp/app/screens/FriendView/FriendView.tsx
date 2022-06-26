import { StyleSheet, View, Text, Button } from 'react-native'
import { COLORS } from '../../settings'

export const FriendView = ({ route }: { route: { params: { friend: User } } }) => {
	const friend = route.params.friend
	return (
		<View style={styles.container}>
			<Text style={styles.header}>{friend.username}</Text>
			<Text>{friend.display_name}</Text>
			<View style={styles.section}>
				<Text style={styles.subHeader}>Activities:</Text>
				{friend.activities.map((activity, i) => {
					return <Text style={styles.bigText} key={i}>{activity.name}</Text>
				})}
				{friend.activities.length === 0 && (
					<Text style={styles.bigText}>{friend.username} has no activities</Text>
				)}
			</View>
			<View style={styles.section}>
				<Text style={styles.subHeader}>Events:</Text>
				{friend.events.map((event, i) => {
					return <Text style={styles.bigText} key={i}>{event.name}</Text>
				})}
				{friend.events.length === 0 && (
					<Text style={styles.bigText}>{friend.username} has no activities</Text>
				)}
			</View>
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
	subHeader: {
		color: 'black',
		fontSize: 30,
	},
	bigText: {
		fontSize: 25
	},
	section: {
		margin: 10,
		padding: 10,
		backgroundColor: 'white',
		width: '80%',
		borderRadius: 10
	}
})