import { StyleSheet, View, Image, Text, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native'
const logoImage = require('../../assets/SumFun.png')
const addImage = require('../../assets/add.png')
import { useContext } from 'react'
import { useState } from 'react'
import { COLORS } from '../../settings'
import { ZacButton } from '../../components/ZacButton'
import { UserContext } from '../../../contexts'
import { client } from '../../../client'
import { CREATE_EVENT } from './queries'
import { StackActions } from '@react-navigation/native'
import RNPickerSelect from "react-native-picker-select";
const Picker = RNPickerSelect as any;

export const CreateEventView = ({ navigation }: { navigation: any }) => {
	const { user, setUser } = useContext(UserContext)
	const [name, setName] = useState('')
	const [start_time, setStartTime] = useState(0)
	const [end_time, setEndTime] = useState(0)
	const [lat, setLat] = useState(0)
	const [lon, setLon] = useState(0)

	const tryCreateEvent = async () => {
		const response = await client.mutate({
			mutation: CREATE_EVENT,
			variables: {username: user?.username, name, start_time, end_time, lat, lon }
		})
		if (!response.errors) {
			const data = response.data
			if (data.createEvent.success) {
				Alert.alert('Event Created!', `View it here`, [{ text: 'OK' }])
				if (user) setUser({...user, events: [...user.events, data.createEvent.event]})
				navigation.dispatch(StackActions.replace('Event', { activity: data.createEvent.event }))
			} else Alert.alert('Error', JSON.stringify(data.createEvent.errors), [{ text: 'OK' }])
		} else Alert.alert('Error', JSON.stringify(response.errors), [{ text: 'OK' }])
	}

	return (
		<ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center', justifyContent: 'flex-start',}}>	
		    <View style={styles.header}>
				<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerText}>Create Event</Text>
				</View>
					<TextInput style={styles.textInput} placeholder="Name" placeholderTextColor={COLORS.green} onChangeText={(newName) => setName(newName)} />
					<TextInput style={styles.textInput} keyboardType={'numeric'} placeholder="Start Time" placeholderTextColor={COLORS.green} onChangeText={(newStartTime) => setStartTime(parseInt(newStartTime))} />
					<TextInput style={styles.textInput} keyboardType={'numeric'} placeholder="End Time" placeholderTextColor={COLORS.green} onChangeText={(newEndTime) => setEndTime(parseInt(newEndTime))} />
					<TextInput style={styles.textInput} keyboardType={'numeric'} placeholder="Lat" placeholderTextColor={COLORS.green} onChangeText={(newLat) => setLat(parseInt(newLat))} />
					<TextInput style={styles.textInput} keyboardType={'numeric'} placeholder="Lon" placeholderTextColor={COLORS.green} onChangeText={(newLon) => setLon(parseInt(newLon))} />
				</View>
			</View>	
		<ZacButton style={{ marginTop: 30 }} onPress={tryCreateEvent} color={COLORS.blue} text={'Create Event +'}/>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	header: {
		margin: 0,
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerText: {
		color: 'white',
		fontSize: 25,
		textAlign: 'center',
	},
	container: {
		flex: 1,
		backgroundColor: COLORS.green,
	},
	clickSection: {
		backgroundColor: COLORS.lightblue,
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
	textInput: {
		height: 50,
		textAlign: 'center',
		width: '80%',
		backgroundColor: 'white',
		borderRadius: 10,
		margin: 40,
		marginTop: 10,
		marginBottom: 10,
		fontSize: 20,
	},
	picker: {
		backgroundColor: 'white',
		margin: 10,
		width: '80%',
		padding: 15,
		textAlign: 'center',
		borderRadius: 20,
	},
})
