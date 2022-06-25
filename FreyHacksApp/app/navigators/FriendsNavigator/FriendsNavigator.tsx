import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { EventsView } from '../../screens/EventsView'
import { EventView } from '../../screens/EventView'
import { CreateEventView } from '../../screens/CreateEventView'
import { MyEventsView } from '../../screens/MyEventsView'
import { FriendsView } from '../../screens/FriendsView'
const ActivitiesStack = createNativeStackNavigator() as any

export const FriendsNavigator = () => {
    return (
        <ActivitiesStack.Navigator>
            <ActivitiesStack.Screen name="All Friends" component={FriendsView} />     
            {/* <ActivitiesStack.Screen name="Event" component={EventView} />         
            <ActivitiesStack.Screen name="My Events" component={MyEventsView} />
            <ActivitiesStack.Screen name="Create Event" component={CreateEventView} /> */}
    </ActivitiesStack.Navigator>
    )
}