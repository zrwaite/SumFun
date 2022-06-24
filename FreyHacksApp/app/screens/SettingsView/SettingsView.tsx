import {View, Text, Image} from "react-native"
const accountIcon = require('../../assets/account.png')
const SettingsView = () => {
	return (
		<View>
			<Text>Settings</Text>
			<View>
				<Image
					source={accountIcon}
					style={{
						height: 45,
						width: 40,
						marginRight: 20,
					}}
				/>
            	<Text>Profile</Text>
			</View>
			
		</View>
	)
}

export { SettingsView }