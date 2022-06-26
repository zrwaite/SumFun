import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native'
const logoImage = require('../../assets/icon.png')
import { useContext } from 'react'
import { COLORS } from '../../settings'
import { UserContext } from '../../../contexts'
const addImage = require('../../assets/add.png')
const sumFun = require('../../assets/SumFun.png')
const events = require('../../assets/Events-icon.png')

export const EventsView = ({ navigation }: { navigation: any }) => {
	const { user } = useContext(UserContext)

	return (
		<ScrollView>
			<View style={styles.container}>				
				<Text style={styles.clickSectionText}>Events:</Text>		
				
				<TouchableOpacity style={styles.clickSection} onPress={() => navigation.navigate('My Events')}>
					<Text style={styles.clickSectionText}>My Events</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.clickSection} onPress={() => navigation.navigate('Find Events')}>
					<Text style={styles.clickSectionText}>Find Events</Text>
				</TouchableOpacity>
				
				<TouchableOpacity style={styles.clickSection} onPress={() => navigation.navigate('Create Event')}>
					<Image
						source={addImage}
						style={{
							height: 30,
							width: 30,
							marginRight: 20,
						}}/>
					<Text style={styles.clickSectionText}>Create Event</Text>
				</TouchableOpacity>
					
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
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	header: {
		margin: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		width: '100%',	
	},
	text: {
		marginTop: 187,
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
	headerText: {
		color: 'white',
		fontSize: 25,
		textAlign: 'left',
	},
	container: {
		flexDirection: 'column' ,
		backgroundColor: COLORS.vomitgreen,
		alignItems: 'center',
		justifyContent: 'center',
	},
	clickSection: {
		backgroundColor: COLORS.white,
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
		fontSize: 35,
		textAlign: 'center',
	},
})
