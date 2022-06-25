import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native'
const logoImage = require('../../assets/icon.png')
const addImage = require('../../assets/add.png')
const settingsImage = require('../../assets/settings-icon.png')
const eventsImage = require('../../assets/Events-icon.png')
const activityImage = require('../../assets/activity-icon.png')
const postsImage = require('../../assets/add.png')
const friendsImage = require('../../assets/friends-icon1.png')
const homeImage = require('../../assets/home-icon.png')
const waterpoloImage = require('../../assets/73987-200.png')
const activitiesImage = require('../../assets/196067.png')
import { useContext } from 'react'
import { COLORS } from '../../settings'
import { ZacButton } from '../../components/ZacButton'
import { UserContext } from '../../../contexts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native'
import {goLogin} from "../../../App"

const logout = async (navigation: any, setUser: Function) => {
	await AsyncStorage.setItem('username', '')
	goLogin()
	setUser(null)
}

export const HomeView = ({ navigation }: { navigation: any }) => {
	const { user, setUser } = useContext(UserContext)

	return (
		<ScrollView>
			<View style={styles.header}>
				<Image
					source={activityImage}
					style={{
						height: 40,
						width: 40,
						marginRight: 10,
					}}
				/>
				<Text style={styles.headerText}>OnlyPlans</Text>
			</View>
			<View style={styles.header}>
				<Text style={styles.bodyText}>Welcome, {user?.username}</Text>
			</View>
			<View style={styles.text}>
				<Image
					source={waterpoloImage}
					style={{
						height: 80,
						width: 80,
						marginRight: 10,
					}}
				/>
				<TouchableOpacity style={styles.clickSection} onPress={() => navigation.navigate('Events')}>
					<Text style={styles.clickSectionText}>Upcoming Events</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.text}>
				<Image
					source={activitiesImage}
					style={{
						height: 80,
						width: 80,
						marginRight: 10,
					}}
				/>
				<TouchableOpacity style={styles.clickSection} onPress={() => navigation.navigate('Activities')}>
					<Text style={styles.clickSectionText}>Suggested Activities</Text>
				</TouchableOpacity>
			</View>

			<ZacButton style={styles.loginButton} onPress={() => logout(navigation, setUser)} text={'Logout'} color={'white'} />
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
	body: {
		margin: 575,
		borderRadius: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	text: {
		margin: 20,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		borderColor: 'black',
		borderWidth: 3,
	},
	loginButton: {
		margin: 20,
		borderRadius: 20,
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	headerText: {
		color: 'white',
		fontSize: 40,
		textAlign: 'left',
	},
	bodyText: {
		color: 'white',
		fontSize: 40,
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
