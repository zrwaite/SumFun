
import React from "react"
import { StyleSheet, View, Image, Text, SafeAreaView, TextInput } from 'react-native'
const logoImage = require('../../assets/icon.png')
import { useContext } from 'react'
import { COLORS } from '../../settings'
import { UserContext } from '../../../contexts'
const profileImage = require('../../assets/profile-icon.png')
  

export const ProfileView = ({ navigation }: { navigation: any }) => {
	const [text, onChangeText] = React.useState('Bio Input');
  const [number, onChangeNumber] = React.useState(0);
  const { user } = useContext(UserContext)
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
				<Text style={styles.headerText}>Profile</Text>
			</View>
			<View style={styles.header}>
				<Text style={styles.bodyText}>{user?.username}</Text>
			</View>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TextInput
          style={styles.input}
          onChangeText={(newNumber) => onChangeNumber(parseInt(newNumber))}
          value={number.toString()}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      </SafeAreaView>
		</View>
	);
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
		color: 'white',
		fontSize: 25,
		textAlign: 'left',
	},
	container: {
		flex: 1,
		backgroundColor: COLORS.lightgrey,
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
  bodyText: {
    color: 'black',
    fontSize: 20,
  }
});