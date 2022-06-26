import { StyleSheet, View, Image, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
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
				setEvents(data.listEvents.events.filter((event:ActivityEvent) => new Date(event.date) > new Date()))
			} else {
				Alert.alert('Error', JSON.stringify(data.listEvents.errors), [{ text: 'OK'  }])
				setEventsState('NOT_FOUND')
			}
		} else Alert.alert('Error', JSON.stringify(response.errors), [{ text: 'OK'  }])
		setEventsState('FOUND')
	}
	if (eventsState === 'LOADING') {
		tryListEvents()
	}

	return (
		<ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center',justifyContent: 'flex-start',}}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Future events near you</Text>
			</View>
			{events.map((event, i) => {
				return (
				<TouchableOpacity key={i} style={styles.clickSection} onPress={() => navigation.navigate('Event',  { event: event })}>
					<View>
						<Text style={styles.clickSectionText}>{event.name}</Text>
						<Text style={styles.clickSectionText}>Lat: {event.lat}</Text>
						<Text style={styles.clickSectionText}>Lon: {event.lon}</Text>
					</View>
				</TouchableOpacity>
				)
			})}
		</ScrollView>
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
		textAlign: 'center',
	},
})
