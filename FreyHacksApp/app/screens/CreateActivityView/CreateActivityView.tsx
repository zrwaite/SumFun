import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native'
const logoImage = require('../../assets/icon.png')
const addImage = require('../../assets/add.png')
import { useContext } from 'react'
import { COLORS } from '../../settings'
import { ZacButton } from '../../components/ZacButton'
import { UserContext } from '../../../contexts'
import { client } from '../../../client'
import { CREATE_ACTIVITY } from './queries'
import { StackActions } from '@react-navigation/native'

export const CreateEventsView = ({ navigation }: { navigation: any }) => {
	const { user, setUser } = useContext(UserContext)

	const tryCreateActivity = async () => {
		const response = await client.mutate({
			mutation: CREATE_ACTIVITY,
			variables: { },
		})
		if (!response.errors) {
			const data = response.data
			if (data.createActivity.success) {
				Alert.alert('Activity Created!', `View it here`, [{ text: 'OK' }])
				if (user) setUser({...user, activities: [...user.activities, data.createActivity.activity]})
				navigation.dispatch(StackActions.replace('Activity', { activity: data.createActivity.activity }))
			} else Alert.alert('Error', JSON.stringify(data.createActivity.errors), [{ text: 'OK' }])
		} else Alert.alert('Error', JSON.stringify(response.errors), [{ text: 'OK' }])
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
			<TouchableOpacity style={styles.clickSection} onPress={() => navigation.navigate('Settings')}>
				<Image
					source={addImage}
					style={{
						height: 30,
						width: 30,
						marginRight: 20,
					}}/>
				<Text style={styles.clickSectionText}>You have no loved ones</Text>
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
