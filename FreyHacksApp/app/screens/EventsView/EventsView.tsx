import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
const logoImage = require('../../assets/icon.png')
import { useContext } from 'react'
import { COLORS } from '../../settings'
import { UserContext } from '../../../contexts'

export const EventsView = ({ navigation }: { navigation: any }) => {
	const { user } = useContext(UserContext)

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
			<TouchableOpacity style={styles.clickSection} onPress={() => navigation.navigate('My Events')}>
				<Text style={styles.clickSectionText}>My Events</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.clickSection} onPress={() => navigation.navigate('Find Events')}>
				<Text style={styles.clickSectionText}>Find Events</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.clickSection} onPress={() => navigation.navigate('Create Events')}>
				<Image
					source={addImage}
					style={{
						height: 30,
						width: 30,
						marginRight: 20,
					}}/>
				<Text style={styles.clickSectionText}>Create Events</Text>
			</TouchableOpacity>
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
