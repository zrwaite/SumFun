import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { EventsView } from '../../screens/EventsView'
import { EventView } from '../../screens/EventView'
import { CreateEventView } from '../../screens/CreateEventView'
import { MyEventsView } from '../../screens/MyEventsView'
import { FindEventsView } from '../../screens/FindEventsView'
const ActivitiesStack = createNativeStackNavigator() as any

export const EventsNavigator = () => {
    return (
        <ActivitiesStack.Navigator>
            <ActivitiesStack.Screen name="All Events" component={EventsView} />  
            <ActivitiesStack.Screen name="My Events" component={MyEventsView} />
            <ActivitiesStack.Screen name="Find Events" component={FindEventsView} /> 
            <ActivitiesStack.Screen name="Event" component={EventView} />         
            <ActivitiesStack.Screen name="Create Event" component={CreateEventView} />
        </ActivitiesStack.Navigator>
    )
}