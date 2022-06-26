import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState } from 'react'
import { LoginView } from './app/screens/LoginView/LoginView'
import { client } from './client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GET_USER } from './queries'
import { Alert } from 'react-native'
import { LoadingScreen } from './app/screens/LoadingScreen'
import { UserContext } from './contexts'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { EventsNavigator } from './app/navigators/EventsNavigator'
import { HomeNavigator } from './app/navigators/HomeNavigator'
import { ActivitiesNavigator } from './app/navigators/ActivitiesNavigator'
import { FriendsNavigator } from './app/navigators/FriendsNavigator'
import { ProfileNavigator } from './app/navigators/ProfileNavigator'
const Tab = createBottomTabNavigator() as any    //added thi


export let goLogin = () => {}

export default function App() {
	const [usernameState, setUsernameState] = useState<'LOADING' | 'NOT_FOUND' | 'FOUND'>('LOADING')
	const tryGetUser = async () => {
		const username = await AsyncStorage.getItem('username')
		if (!username) {
			setUsernameState('NOT_FOUND')
			return
		}
		const response = await client.query({
			query: GET_USER,
			variables: { username },
		})
		if (!response.error) {
			const data = response.data
			if (data.getUser.success) {
				setUser(data.getUser.user)
			} else Alert.alert('Error', JSON.stringify(data.getUser.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
		} else Alert.alert('Error', JSON.stringify(response.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
		setUsernameState('FOUND')
	}
	goLogin = () => {setUsernameState('NOT_FOUND')}
	const [user, setUser] = useState<User | null>(null)
	const userValue = { user, setUser }

	if (usernameState === 'LOADING') {
		setTimeout(tryGetUser, 1000)
	}
	if (usernameState === 'LOADING') {
		return <LoadingScreen/>
	}
	return (
		<UserContext.Provider value={userValue}>
		<NavigationContainer>
	  	{usernameState === 'NOT_FOUND' && <LoginView goHome={() => {setUsernameState('FOUND')}}/>}
	  	{usernameState === 'FOUND' && (<>
			<Tab.Navigator>
				<Tab.Screen name="Home" component={HomeNavigator} options={{headerShown: false}}/>
				<Tab.Screen name="Events" component={EventsNavigator} options={{headerShown: false}} />
				<Tab.Screen name="Activities" component={ActivitiesNavigator} options={{headerShown: false}} />
				<Tab.Screen name="Friends" component={FriendsNavigator} options={{headerShown: false}}/>
				<Tab.Screen name="Profile" component={ProfileNavigator} options={{headerShown: false}}/>
			</Tab.Navigator>
			</>)}
			</NavigationContainer>
		</UserContext.Provider>
	)
}
