import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { EventsLandingView } from '../../screens/EventsLandingView'
import { EventView } from '../../screens/EventView'
import { CreateEventView } from '../../screens/CreateEventView'
import { MyEventsView } from '../../screens/MyEventsView'
import { FindEventsView } from '../../screens/FindEventsView'
const ActivitiesStack = createNativeStackNavigator() as any

export const EventsNavigator = () => {
    return (
        <ActivitiesStack.Navigator>
            <ActivitiesStack.Screen name="Events Home" component={EventsLandingView} />  
            <ActivitiesStack.Screen name="My Events" component={MyEventsView} />
            <ActivitiesStack.Screen name="Find Events" component={FindEventsView} /> 
            <ActivitiesStack.Screen name="Event" component={EventView} />         
            <ActivitiesStack.Screen name="Create Event" component={CreateEventView} />
        </ActivitiesStack.Navigator>
    )
}