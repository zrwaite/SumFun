import { ZacButton } from '../../components/ZacButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {goLogin} from "../../../App"
import React from "react"
import { StyleSheet, View, Image, Text, SafeAreaView, TextInput } from 'react-native'
const logoImage = require('../../assets/icon.png')
import { useContext } from 'react'
import { COLORS } from '../../settings'
import { UserContext } from '../../../contexts'
const profileImage = require('../../assets/profile-icon.png')
const sumFun = require('../../assets/SumFun.png')
const profileIcon = require('../../assets/profile-icon.png')

/*
export const ProfileView = ({ navigation }: { navigation: any }) => {
	
  const { user } = useContext(UserContext)
  const testGeolocate = async () => {
	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};
	
	function success(pos:any) {
		const crd = pos.coords;
		let lat = crd.latitude;
		let lon = crd.longitude;
	}
	
	function error(err:any) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}
	
	navigator.geolocation.getCurrentPosition(success, error, options);
}
}
*/

const logout = async (navigation: any, setUser: Function) => {
	await AsyncStorage.setItem('username', '')
	goLogin()
	setUser(null)
}

export const ProfileView = ({ navigation }: { navigation: any }) => {
	const { user, setUser } = useContext(UserContext)
	return (
		<View style={styles.container}>
			<View style={styles.header}>					
				<Text style={styles.headerText}>Profile:</Text>
			</View>			
			<Image
			source={profileIcon}
			style={{
				height:130,
				width: 130,
				marginRight: 0,
			}}/>
			<Text style={styles.bodyText}>{user?.username}</Text>
			<Text style={styles.bodyText}># Friends: {user?.friends.length}</Text>
			<View style={styles.text}>	
				<Image
					source={sumFun}
					style={{
						height:114,
						width:320,
						marginRight: 0,
					}}/>
			</View>
			<ZacButton style={styles.loginButton} onPress={() => logout(navigation, setUser)} text={'Logout'} color={'white'} />
		</View>
	)
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    },
	header: {
		margin: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	headerText: {
		color: 'black',
		fontSize: 35,
		textAlign: 'left',
	},
	text: {
		marginTop: 210,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end',
		width: '100%',
		borderColor: 'black',
		borderWidth: 3,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomWidth: 0,	
	},
	container: {
		flex: 1,
		backgroundColor: COLORS.lightgreen,
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
	loginButton: {
		margin: 20,
		borderRadius: 20,
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
  	bodyText: {
    	color: 'black',
    	fontSize: 35,
		textAlign: 'left',
  	},
})