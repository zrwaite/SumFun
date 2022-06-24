import { Text, StyleSheet, ActivityIndicator, Image, View } from 'react-native'
const logoImage = require('../assets/icon.png')

export const LoadingScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={{ ...styles.text, marginTop: 100 }}>Frey Hacks App</Text>
			<Image
				source={logoImage}
				style={{
					height: 120,
					width: 240,
					marginBottom: 50,
				}}
			/>
			<Text style={styles.text}>Loading...</Text>
			<ActivityIndicator size="large" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	text: {
		fontSize: 40,
		color: 'white',
		textAlign: 'center',
		margin: 30,
	},
})
