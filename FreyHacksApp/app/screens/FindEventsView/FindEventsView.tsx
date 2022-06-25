import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
const logoImage = require('../../assets/icon.png')
const addImage = require('../../assets/add.png')
const postsImage = require('../../assets/add.png')
import { useContext } from 'react'
import { COLORS } from '../../settings'
import { ZacButton } from '../../components/ZacButton'
import { UserContext } from '../../../contexts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native'

const logout = async (navigation: any, setUser: Function) => {
	await AsyncStorage.setItem('username', '')
	navigation.dispatch(StackActions.replace('Login'))
	setUser(null)
}

export const FindEventsView = ({ navigation }: { navigation: any }) => {
	const { user, setUser } = useContext(UserContext)

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
				<Text style={styles.clickSectionText}>FUCK OH FUCK THEYRE IN THE WALLS</Text>
			</TouchableOpacity>
			<ZacButton onPress={() => logout(navigation, setUser)} text={'Logout'} color={'white'} />
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
