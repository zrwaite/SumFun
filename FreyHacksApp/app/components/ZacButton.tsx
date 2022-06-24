import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

export const ZacButton = (props: { onPress: () => void; text: string; color?: string; style?: ViewStyle; enabled?: boolean }) => {
	let buttonEnabled = props.enabled
	if (buttonEnabled === undefined) buttonEnabled = true
	const styles = StyleSheet.create({
		container: {
			display: 'flex',
			justifyContent: 'center',
			height: 40,
			width: '50%',
			margin: 10,
			borderRadius: 20,
			backgroundColor: props.color ?? 'grey',
			...props.style,
		},
		text: {
			margin: 'auto',
			textAlign: 'center',
			color: 'black',
			fontSize: 20,
			width: '100%',
		},
	})
	return buttonEnabled ? (
		<TouchableOpacity style={styles.container} onPress={props.onPress}>
			<Text style={styles.text}>{props.text}</Text>
		</TouchableOpacity>
	) : (
		<View style={{ ...styles.container, opacity: 0.5 }}>
			<Text style={styles.text}>{props.text}</Text>
		</View>
	)
}
