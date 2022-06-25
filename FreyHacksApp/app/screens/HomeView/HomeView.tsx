import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
const logoImage = require('../../assets/icon.png')
const addImage = require('../../assets/add.png')
const settingsImage = require('../../assets/settings-icon.png')
const eventsImage = require('../../assets/Events-icon.png')
const activityImage = require('../../assets/activity-icon.png')
const postsImage = require('../../assets/add.png')
const friendsImage = require('../../assets/friends-icon1.png')
const homeImage = require('../../assets/home-icon.png')
const waterpoloImage = require('../../assets/73987-200.png')
const activitiesImage =require('../../assets/196067.png')
import { useContext } from 'react'
import { COLORS } from '../../settings'
import { ZacButton } from '../../components/ZacButton'
import { UserContext } from '../../../contexts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native'
import { NavBar } from "../../components/NavBar";

const logout = async ( setUser: Function) => {
	await AsyncStorage.setItem('username', '')
	// navigation.dispatch(StackActions.replace('Login'))
	setUser(null)
}


export const HomeView = () => {
	const { user, setUser } = useContext(UserContext)

	return (
		<LinearGradient colors={['#00C6FB', '#005BEA']} style={styles.container}>
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
			{/* nav bar */}
			<View style={styles.body}>
				<TouchableOpacity style={styles.clickSection} onPress={() => navigation.navigate('Home')}>
					<Image
						source={homeImage}
						style={{
							height: 40,
							width: 40,
							marginRight: 0,
						}}
					/>
					<Text style={styles.clickSectionText}></Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.clickSection} onPress={() => navigation.navigate('Events')}>
					<Image
						source={eventsImage}
						style={{
							padding: 10,
							height: 40,
							width: 40,
							marginRight: 0,
							position: 'absolute', 
						}}
					/>
					<Text style={styles.clickSectionText}></Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.clickSection} onPress={() => navigation.navigate('Activities')}>
					<Image
						source={activityImage}
						style={{
							height: 40,
							width: 40,
							marginRight: 0,
						}}
					/>
					<Text style={styles.clickSectionText}></Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.clickSection} onPress={() => navigation.navigate('Friends')}>
					<Image
						source={friendsImage}
						style={{
							height: 40,
							width: 40,
							marginRight: 0,
						}}
					/>
					<Text style={styles.clickSectionText}></Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.clickSection} onPress={() => navigation.navigate('Settings')}>
					<Image
						source={settingsImage}
						style={{
							padding: 10,
							height: 40,
							width: 40,
							marginRight: 0,
						}}
					/>
					<Text style={styles.clickSectionText}></Text>
				</TouchableOpacity>
			</View>	
		</LinearGradient>
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
	body:{
		margin: 575,
		borderRadius: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	text:{
		margin: 20,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width:'100%',
		borderColor: 'black',
		borderWidth: 3,
	},
	loginButton:{
		margin:20,
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
		fontsize: 40,
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
