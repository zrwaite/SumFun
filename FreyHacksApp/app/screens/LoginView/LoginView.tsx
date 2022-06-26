import { StyleSheet, Alert, View, Image, Text, TextInput } from 'react-native'
const logoImage = require('../../assets/icon.png')
import AsyncStorage from '@react-native-async-storage/async-storage'

import { useContext, useState } from 'react'
import { COLORS } from '../../settings'
import { ZacButton } from '../../components/ZacButton'
import { client } from '../../../client'
import { LOGIN } from './queries'
import { SIGNUP } from './mutations'
import { UserContext } from '../../../contexts'
const sumFun = require('../../assets/SumFun.png')

export const LoginView = (props: {goHome: () => void }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const buttonsEnabled = username.length !== 0 && password.length !== 0
	const { setUser } = useContext(UserContext)

	const tryLogin = async () => {
		const response = await client.query({
			query: LOGIN,
			variables: { username, password },
		})
		if (!response.error) {
			const data = response.data
			if (data.login.success) {
				try {
					await AsyncStorage.setItem('username', username)
					Alert.alert('Logged In', `You are logged in as "${username}"`, [{ text: 'OK' }])
					setUser(data.login.user)
					props.goHome()
				} catch (e) {
					Alert.alert('Something went wrong', 'Try again', [{ text: 'OK' }])
				}
			} else {
				Alert.alert('Error', JSON.stringify(data.login.errors), [{ text: 'OK'  }])
			}
		}
	}

	const trySignUp = async () => {
		const response = await client.mutate({
			mutation: SIGNUP,
			variables: { username, password },
		})
		if (!response.errors) {
			const data = response.data
			if (data.createUser.success) {
				try {
					await AsyncStorage.setItem('username', username)
					Alert.alert('User Created!', `You are logged in as "${username}"`, [{ text: 'OK' }])
					setUser(data.createUser.user)
					props.goHome()
				} catch (e) {
					Alert.alert('Something went wrong', 'Try again', [{ text: 'OK' }])
				}
			} else Alert.alert('Error', JSON.stringify(data.createUser.errors), [{ text: 'OK'  }])
		} else Alert.alert('Error', JSON.stringify(response.errors), [{ text: 'OK'  }])
	}
	return (
		<View style={styles.container}>		
			<View style={styles.text}>	
				<Image
					source={sumFun}
					style={{
						height:114,
						width:320,
						marginRight: 0,
							
				}}/>
			</View>

			<TextInput style={styles.textInput} placeholder="Username" placeholderTextColor={COLORS.lightblue} onChangeText={(username) => setUsername(username)} />
			<TextInput style={styles.textInput} placeholder="Password" placeholderTextColor={COLORS.lightblue} onChangeText={(password) => setPassword(password)} />
			<ZacButton style={{ marginTop: 30 }} onPress={tryLogin} color={COLORS.blue} text={'Login'} enabled={buttonsEnabled} />
			<ZacButton onPress={trySignUp} color={COLORS.yellow} text={'Sign Up'} enabled={buttonsEnabled} />
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		color: 'white',
		fontSize: 40,
		textAlign: 'center',
		margin: 40,
	},
	container: {
		flex: 1,
		backgroundColor: COLORS.lightgrey,
		alignItems: 'center',
		justifyContent: 'flex-start',
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
	text: {
		marginTop: 150,
		marginBottom: 60,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '80%',
	},
})
