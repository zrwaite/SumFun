import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { COLORS } from '../../settings'

export const EventView = ({ route, navigation }: { navigation: any, route: { params: { event: ActivityEvent } } }) => {
	const event = route.params.event
	return (
		<View style={styles.container}>
			<Text style={styles.header}>{event.name}</Text>
			<Text style={styles.header}>Date: {event.date}</Text>
			<Text style={styles.header}>Start Time: {event.start_time}</Text>
			<Text style={styles.header}>End Time: {event.end_time}</Text>
			<Text style={styles.header}>Location: {event.location}</Text>
			<TouchableOpacity style={styles.activitySection} onPress={() => navigation.navigate('Activity', { activity: event.activity })}>
				<Text>{event.activity.name}</Text>
			</TouchableOpacity>
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
	description: {
		color: 'black',
		fontSize: 25,
		margin: 20,
	},
	content: {
		color: 'white',
		fontSize: 20,
		padding: 5,
	},
	footer: {
		color: 'black',
		fontSize: 20,
		marginTop: 20,
		fontStyle: 'italic',
	},
	activitySection: {
		backgroundColor: 'white',
		width: '80%',
		margin: 20,
		padding: 10,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
})