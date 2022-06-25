import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
const logoImage = require('../../assets/icon.png')
const addImage = require('../../assets/add.png')
const postsImage = require('../../assets/add.png')
import { useContext } from 'react'
import { COLORS } from '../../settings'
import { ZacButton } from '../../components/ZacButton'
import { UserContext } from '../../../contexts'

export const MyEventsView = ({ navigation }: { navigation: any }) => {
	const { user } = useContext(UserContext)

	return (
		<View style={styles.container}>
			<View style={styles.text}>
				<Text style={styles.headerText}>Upcoming Events:</Text>
				<Text style={styles.headerText}>Maybe some backend stuff here?</Text>
			</View>
			<View style={styles.text}>
				<Text style={styles.headerText}>Past Events:</Text>
				<Text style={styles.headerText}>Maybe some backend stuff here?</Text>
			</View>
			{user?.events.map((event, i) => {
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
	text:{
		margin: 20,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width:'100%',
		borderColor: 'black',
		borderWidth: 3,
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
