import { StyleSheet, Alert, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'

import { useContext} from 'react'
import { COLORS } from '../../settings'
import { UserContext } from '../../../contexts'

export const MyActivitiesView = ({ navigation }: { navigation: any }) => {
	const { user } = useContext(UserContext)
	return (
		<ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
			<Text style={styles.headerText}>My Activities:</Text>
			{user?.activities.map((activity, i) => {
				return (
					<TouchableOpacity key={i} style={styles.activitySection} onPress={() => navigation.navigate('Activity', { activity: activity })}>
						<Text style={styles.activitySectionHeader}>{activity.name}</Text>
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
		backgroundColor: COLORS.yellow,
		width: '100%',
		padding: 20,
		overflow: 'scroll',
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
	activitySectionHeader: {
		color: 'black',
		fontSize: 20,
		textAlign: 'center',
	},
	activitySectionDescription: {
		color: 'grey',
		fontSize: 15,
		textAlign: 'center',
	},
})