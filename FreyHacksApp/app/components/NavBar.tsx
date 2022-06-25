import { StackActions } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
const addImage = require('../assets/add.png')
const settingsImage = require('../assets/settings-icon.png')
const eventsImage = require('../assets/Events-icon.png')
const activityImage = require('../assets/activity-icon.png')
const postsImage = require('../assets/add.png')

export const NavBar = ({ navigation }: { navigation: any }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.clickSection} onPress={() => navigation.dispatch(StackActions.replace('Activities'))}>
                <Image
                    source={settingsImage}
                    style={{
                        height: 40,
                        width: 40,
                        marginRight: 20,
                    }}
                />
                <Text style={styles.clickSectionText}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clickSection} onPress={() => navigation.dispatch(StackActions.replace('Activities'))}>
                <Image
                    source={eventsImage}
                    style={{
                        height: 40,
                        width: 40,
                        marginRight: 20,
                    }}
                />
                <Text style={styles.clickSectionText}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clickSection} onPress={() => navigation.dispatch(StackActions.replace('Activities'))}>
                <Image
                    source={activityImage}
                    style={{
                        height: 40,
                        width: 40,
                        marginRight: 20,
                    }}
                />
                <Text style={styles.clickSectionText}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clickSection} onPress={() => navigation.dispatch(StackActions.replace('Activities'))}>
                <Image
                    source={activityImage}
                    style={{
                        height: 40,
                        width: 40,
                        marginRight: 20,
                    }}
                />
                <Text style={styles.clickSectionText}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clickSection} onPress={() => navigation.dispatch(StackActions.replace('Activitys'))}>
                <Image
                    source={activityImage}
                    style={{
                        height: 40,
                        width: 40,
                        marginRight: 20,
                    }}
                />
                <Text style={styles.clickSectionText}></Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        padding: 20,
        paddingTop: 0
    },
    clickSection: {
        backgroundColor: 'white',
        width: '20%',
        margin: 0,
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
})
