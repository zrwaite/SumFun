import { StyleSheet, Alert, Text, TouchableOpacity, ActivityIndicator, ScrollView, Image } from 'react-native'

import { useContext, useState } from 'react'
import { client } from '../../../client'
import { COLORS } from '../../settings'
import { UserContext } from '../../../contexts'
const addImage = require('../../assets/add.png')
import { LIST_ACTIVITIES } from './queries'
const sumFun = require('../../assets/SumFun.png')



export const ActivitiesView = ({ navigation }: { navigation: any }) => {
	const { user } = useContext(UserContext)
	const [activitiesState, setActivitiesState] = useState<'LOADING' | 'NOT_FOUND' | 'FOUND'>('LOADING')
	const [activities, setActivities] = useState<Activity[]>([])
	const tryListActivities = async () => {
		const response = await client.query({
			query: LIST_ACTIVITIES,
		})
		if (!response.error) {
			const data = response.data
			if (data.listActivities.success) {
				setActivities(data.listActivities.activities)
			} else {
				Alert.alert('Error', JSON.stringify(data.getUser.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
				setActivitiesState('NOT_FOUND')
			}
		} else Alert.alert('Error', JSON.stringify(response.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
		setActivitiesState('FOUND')
	}
	if (activitiesState === 'LOADING') {
		tryListActivities()
	}
	return (

		<ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
				{activitiesState === 'LOADING' ? (
					<ActivityIndicator size="large" />
				) : (<>
				<Text style={styles.clickSectionText}>Activities:</Text>	
					{activities.map((activity, i) => {
						return (
							<TouchableOpacity key={i} style={styles.activitySection} onPress={() => navigation.navigate('Activity', { activity: activity })}>
								<Text style={styles.activitySectionHeader}>{activity.name}</Text>
							</TouchableOpacity>
						)
					})}
					<TouchableOpacity style={styles.clickSection} onPress={() => navigation.navigate('Create Activity')}>
						<Image
							source={addImage}
							style={{
								height: 30,
								width: 30,
								marginRight: 20,
							}}/>	
						<Text style={styles.clickSectionText}>Create Activity</Text>
					</TouchableOpacity>		
					<Image
						source={sumFun}
						style={{
							height:114,
							width:320,
						}}/>	
				</>)}
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
	text: {
		margin: 180,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end',
		width: '100%',
		borderColor: 'black',
		borderWidth: 3,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomWidth: 0,	
	},
	headerText: {
		color: 'white',
		fontSize: 25,
		textAlign: 'left',
	},
	container: {
		flex: 1,
		backgroundColor: COLORS.blue,
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
		fontSize: 35,
	},
})