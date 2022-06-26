import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useContext } from 'react'
import { COLORS } from '../../settings'
import { UserContext } from '../../../contexts'

export const FriendsView = ({ navigation }: { navigation: any }) => {
	const { user } = useContext(UserContext)
	return (
		<ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
			{user?.friends.map((friend, i) => {
				return (
					<TouchableOpacity key={i} style={styles.friendSection} onPress={() => navigation.navigate('Friend', { friend: friend })}>
						<Text style={styles.friendSectionHeader}>{friend.username}</Text>
						<Text style={styles.friendSectionText}>{friend.display_name}</Text>
					</TouchableOpacity>					
				)
			})}
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
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		width: '100%',
		padding: 20,
		overflow: 'scroll',
	},
	friendSection: {
		backgroundColor: 'white',
		width: '80%',
		margin: 20,
		padding: 10,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	friendSectionHeader: {
		color: 'black',
		fontSize: 20,
		textAlign: 'center',
	},
	friendSectionText: {
		color: 'grey',
		fontSize: 15,
		textAlign: 'center',
	},
})