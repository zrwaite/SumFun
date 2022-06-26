
import React from "react"
import { StyleSheet, View, Image, Text, SafeAreaView, TextInput } from 'react-native'
const logoImage = require('../../assets/icon.png')
import { useContext } from 'react'
import { COLORS } from '../../settings'
import { UserContext } from '../../../contexts'
const profileImage = require('../../assets/profile-icon.png')
const sumFun = require('../../assets/SumFun.png')

export const ProfileView = ({ navigation }: { navigation: any }) => {
	const [text, onChangeText] = React.useState('Bio Input');
  const [number, onChangeNumber] = React.useState(0);
  const { user } = useContext(UserContext)
	return (
		<View style={styles.container}>
			<View style={styles.header}>				
				<Text style={styles.headerText}>Profile:</Text>
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
    
      </SafeAreaView>
	    <View style={styles.text}>	
						<Image
							source={sumFun}
							style={{
								height:114,
								width:320,
								marginRight: 0,
							
							}}/>
		</View>
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
		color: 'black',
		fontSize: 35,
		textAlign: 'left',
	},
	text: {
		marginTop: 310,
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
  	bodyText: {
    	color: 'black',
    	fontSize: 27,
		textAlign: 'left',
  	}
});