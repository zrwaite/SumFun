import { StyleSheet, View, Image, Text, TouchableOpacity, Alert, TextInput } from 'react-native'
const logoImage = require('../../assets/icon.png')
const addImage = require('../../assets/add.png')
import { useContext, useState } from 'react'
import { COLORS } from '../../settings'
import { ZacButton } from '../../components/ZacButton'
import { UserContext } from '../../../contexts'
import { client } from '../../../client'
import { CREATE_ACTIVITY } from './queries'
import { StackActions } from '@react-navigation/native'
import RNPickerSelect from "react-native-picker-select";
const Picker = RNPickerSelect as any;

export const CreateActivityView = ({ navigation }: { navigation: any }) => {
	const { user, setUser } = useContext(UserContext)
	const [name, setName] = useState('')
	const [ideal_temp, setIdealTemp] = useState(0)
	const [ideal_wind, setIdealWind] = useState(0)
	const [ideal_pop, setIdealPop] = useState(0)
	const [ideal_uvi, setIdealUvi] = useState(0)
	const [ideal_visibility, setIdealVisibility] = useState(0)
	const [rain, setRain] = useState<RAIN|''>('')
	const buttonsEnabled = name.length !== 0  && rain.length !== 0

	const tryCreateActivity = async () => {
		const response = await client.mutate({
			mutation: CREATE_ACTIVITY,
			variables: { username: user?.username, name, ideal_temp, ideal_wind, ideal_pop, rain, ideal_visibility, ideal_uvi }
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
				<Text style={styles.headerText}>Create Activity</Text>
			</View>
			<TextInput style={styles.textInput} placeholder="Name" placeholderTextColor={COLORS.green} onChangeText={(newName) => setName(newName)} />
			<TextInput style={styles.textInput} keyboardType={'numeric'} placeholder="Min Temp" placeholderTextColor={COLORS.green} onChangeText={(newIdealTemp) => setIdealTemp(parseInt(newIdealTemp))} />
			<TextInput style={styles.textInput} keyboardType={'numeric'} placeholder="Min Wind" placeholderTextColor={COLORS.green} onChangeText={(newIdealWind) => setIdealWind(parseInt(newIdealWind))} />
			<View style={styles.picker}>
				<Picker
					onValueChange={(newRain:RAIN) => setRain(newRain)}
					items={[
						{ label: "Not Allowed", value: "NOT_ALLOWED" },
						{ label: "Encouraged", value: "ENCOURAGED" },
						{ label: "Allowed", value: "ALLOWED" },
						{ label: "After the rain", value: "AFTER" },
					]}
				/>
			</View>
			<ZacButton style={{ marginTop: 30 }} onPress={tryCreateActivity} color={COLORS.blue} text={'Create Activity'} enabled={buttonsEnabled} />
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
	textInput: {
		height: 50,
		textAlign: 'center',
		width: '80%',
		backgroundColor: 'white',
		borderRadius: 20,
		margin: 10,
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
