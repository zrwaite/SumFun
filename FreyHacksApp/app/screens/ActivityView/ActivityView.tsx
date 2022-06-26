import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native'
import { client } from '../../../client';
import { UserContext } from '../../../contexts';
import { tryGetSetUser } from '../../../queries';
import { ZacButton } from '../../components/ZacButton';
import { COLORS } from '../../settings'
import { SUBSCRIBE, UNSUBSCRIBE } from './mutations';



export const ActivityView = ({ route }: { route: { params: { activity: Activity } } }) => {
	const { user, setUser} = useContext(UserContext)
	const activity = route.params.activity
	const subscribed = user?.activity_ids.includes(parseInt(activity.id))
	const trySubscribe = async () => {
		const response = await client.mutate({
			mutation: SUBSCRIBE,
			variables: {id: activity.id, username: user?.username}
		})
		if (!response.errors) {
			const data = response.data
			if (data.subscribeToActivity.success) tryGetSetUser(setUser)
			else Alert.alert('Error', JSON.stringify(data.subscribeToActivity.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
		} else Alert.alert('Error', JSON.stringify(response.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
	}
	const tryUnSubscribe = async () => {
		const response = await client.mutate({
			mutation: UNSUBSCRIBE,
			variables: {id: activity.id, username: user?.username}
		})
		if (!response.errors) {
			const data = response.data
			if (data.unsubscribeFromActivity.success) tryGetSetUser(setUser)
			else Alert.alert('Error', JSON.stringify(data.unsubscribeFromActivity.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
		} else Alert.alert('Error', JSON.stringify(response.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
	}

	return (
		<View style={styles.container}>
			<Text style={styles.header}>{activity.name}</Text>
			<ZacButton 
				text={subscribed?'Unsubscribe':'Subscribe'} 
				onPress={subscribed?tryUnSubscribe:trySubscribe} 
			/>
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
})