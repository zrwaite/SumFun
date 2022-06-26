import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState } from 'react'
import { LoginView } from './app/screens/LoginView/LoginView'
import { client } from './client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GET_USER, tryGetSetUser } from './queries'
import { Alert, Image } from 'react-native'
import { LoadingScreen } from './app/screens/LoadingScreen'
import { UserContext } from './contexts'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { EventsNavigator } from './app/navigators/EventsNavigator'
import { HomeNavigator } from './app/navigators/HomeNavigator'
import { ActivitiesNavigator } from './app/navigators/ActivitiesNavigator'
import { FriendsNavigator } from './app/navigators/FriendsNavigator'
import { ProfileNavigator } from './app/navigators/ProfileNavigator'
import { ErrorScreen } from './app/screens/ErrorScreen'
const homeImage = require("./app/assets/home-icon.png")
const eventImage = require("./app/assets/Events-icon.png")
const activityImage = require("./app/assets/activity-icon.png")
const friendImage = require("./app/assets/friends-icon1.png")
const profileImage = require("./app/assets/profile-icon.png")
const Tab = createBottomTabNavigator() as any    //added thi


export let goLogin = () => {}

export default function App() {
	const [usernameState, setUsernameState] = useState<'LOADING' | 'NOT_FOUND' | 'FOUND' | 'ERROR'>('LOADING')
	const [user, setUser] = useState<User | null>(null)
	const userValue = { user, setUser }

	const tryGetUserSetUserState = async () => {
		const status = await tryGetSetUser(setUser)
		if (status===404) {
			await AsyncStorage.setItem('username', '')
			setUsernameState("NOT_FOUND")
		}
		else if (status===400) {
			await AsyncStorage.setItem('username', '')
			setUsernameState("ERROR")
		}
		else if (status===200) setUsernameState("FOUND")
	}
	goLogin = () => {setUsernameState('NOT_FOUND')}
	

	if (usernameState === 'LOADING') {
		tryGetUserSetUserState()
		return <LoadingScreen/>
	}
	if (usernameState === 'ERROR') return <ErrorScreen/>
	return (
		<UserContext.Provider value={userValue}>
		<NavigationContainer>
	  	{usernameState === 'NOT_FOUND' && <LoginView goHome={() => {setUsernameState('FOUND')}}/>}
	  	{usernameState === 'FOUND' && (<>
			<Tab.Navigator>
				<Tab.Screen name="Home" component={HomeNavigator} options={{
					headerShown: false,
					tabBarIcon: () => (<Image source={homeImage} style={{width: 20, height: 20}} />)
				}}/>
				<Tab.Screen name="Events" component={EventsNavigator}  options={{
					headerShown: false,
					tabBarIcon: () => (<Image source={eventImage} style={{width: 20, height: 20}} />)
				}}/>
				<Tab.Screen name="Activities" component={ActivitiesNavigator}  options={{
					headerShown: false,
					tabBarIcon: () => (<Image source={activityImage} style={{width: 20, height: 20}} />)
				}}/>
				<Tab.Screen name="Friends" component={FriendsNavigator}  options={{
					headerShown: false,
					tabBarIcon: () => (<Image source={friendImage} style={{width: 20, height: 20}} />)
				}}/>
				<Tab.Screen name="Profile" component={ProfileNavigator}  options={{
					headerShown: false,
					tabBarIcon: () => (<Image source={profileImage} style={{width: 20, height: 20}} />)
				}}/>
			</Tab.Navigator>
			</>)}
			</NavigationContainer>
		</UserContext.Provider>
	)
}
