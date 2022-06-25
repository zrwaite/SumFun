import { StyleSheet, Alert, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'

import { useContext, useState } from 'react'
import { client } from '../../../client'
import { COLORS } from '../../settings'
import { ActivitiesContext } from '../../../contexts'

export const ActivitiesView = ({ navigation }: { navigation: any }) => {
	const { activities, setActivities } = useContext(ActivitiesContext)

	const [activitiesState, setActivitiesState] = useState<'LOADING' | 'LOADED'>('LOADING')

	return (
		<ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
			{activitiesState === 'LOADING' ? (
				<ActivityIndicator size="large" />
			) : (
				activities.map((activity, i) => {
					return (
						<TouchableOpacity key={i} style={styles.activitySection} onPress={() => navigation.navigate('Activity', { activity: activity })}>
							{/* <Text style={styles.activitySectionHeader}>{activity.headline}</Text> */}
							{/* <Text style={styles.activitySectionDescription}>{activity.description}...</Text> */}
							<Text style={styles.activitySectionHeader}>activity headline</Text>
							<Text style={styles.activitySectionDescription}>activity description...</Text>
						</TouchableOpacity>
					)
				})
			)}
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