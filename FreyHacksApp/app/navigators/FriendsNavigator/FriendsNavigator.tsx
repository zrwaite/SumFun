import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FriendsView } from '../../screens/FriendsView'
import { FriendView } from '../../screens/FriendView'
const ActivitiesStack = createNativeStackNavigator() as any

export const FriendsNavigator = () => {
    return (
        <ActivitiesStack.Navigator>
            <ActivitiesStack.Screen name="All Friends" component={FriendsView} />     
            <ActivitiesStack.Screen name="Friend" component={FriendView} />     
    </ActivitiesStack.Navigator>
    )
}