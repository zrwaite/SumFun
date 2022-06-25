import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native'
const logoImage = require('../../assets/icon.png')
const addImage = require('../../assets/add.png')
import { useContext, useState } from 'react'
import { COLORS } from '../../settings'
import { UserContext } from '../../../contexts'
import { client } from '../../../client'
import { LIST_EVENTS } from './queries'

export const FindEventsView = ({ navigation }: { navigation: any }) => {
	const { user } = useContext(UserContext)
	const [eventsState, setEventsState] = useState<'LOADING' | 'NOT_FOUND' | 'FOUND'>('LOADING')
	const [events, setEvents] = useState<ActivityEvent[]>([])
	const tryListEvents = async () => {
		const response = await client.query({
			query: LIST_EVENTS,
		})
		if (!response.error) {
			const data = response.data
			if (data.listEvents.success) {
				setEvents(data.listEvents.events)
			} else {
				Alert.alert('Error', JSON.stringify(data.getUser.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
				setEventsState('NOT_FOUND')
			}
		} else Alert.alert('Error', JSON.stringify(response.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
		setEventsState('FOUND')
	}
	if (eventsState === 'LOADING') {
		tryListEvents()
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image
					source={logoImage}
					style={{
						height: 40,
						width: 80,
						marginRight: 10,
					}}
				/>
				<Text style={styles.headerText}>Welcome, {user?.username}</Text>
			</View>
			{events.map((event, i) => {
				return (
				<TouchableOpacity key={i} style={styles.clickSection} onPress={() => navigation.navigate('Event',  { event: event })}>
					<View>
						<Text style={styles.clickSectionText}>{event.name}</Text>
						<Text style={styles.clickSectionText}>Date: {event.date}</Text>
						<Text style={styles.clickSectionText}>Location: {event.location}</Text>
					</View>
				</TouchableOpacity>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		margin: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	headerText: {
		color: 'white',
		fontSize: 25,
		textAlign: 'left',
	},
	container: {
		flex: 1,
		backgroundColor: COLORS.green,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	clickSection: {
		backgroundColor: 'white',
		width: '80%',
		margin: 20,
		flexDirection: 'row',
		padding: 10,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	clickSectionText: {
		color: 'black',
		fontSize: 25,
	},
})
