import { StyleSheet, View, Text } from 'react-native'
import { COLORS } from '../../settings'

export const ActivityView = ({ route }: { route: { params: { activity: Activity } } }) => {
	return (
		<View style={styles.container}>
			{/* <Text style={styles.header}>{route.params.activity.headline}</Text>
			<Text style={styles.description}>{route.params.activity.description}</Text>
			<Text style={styles.content}>{route.params.activity.content}</Text> */}
			<Text style={styles.footer}>- A Very Credible Source</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.blue,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop: 20,
	},
	header: {
		color: 'black',
		fontSize: 40,
		textAlign: 'center',
	},
	description: {
		color: 'black',
		fontSize: 25,
		margin: 20,
	},
	content: {
		color: 'white',
		fontSize: 20,
		padding: 5,
	},
	footer: {
		color: 'black',
		fontSize: 20,
		marginTop: 20,
		fontStyle: 'italic',
	},
})