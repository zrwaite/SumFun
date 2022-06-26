import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeView } from '../../screens/HomeView'
import { MyEventsView } from '../../screens/MyEventsView'
import { ActivitiesView } from '../../screens/ActivitiesView'
const ActivitiesStack = createNativeStackNavigator() as any

export const HomeNavigator = () => {
    return (
        <ActivitiesStack.Navigator>
            <ActivitiesStack.Screen name="Home page" component={HomeView} />   
            {/* <ActivitiesStack.Screen name="All Events" component={MyEventsView} />             
            <ActivitiesStack.Screen name="My Events" component={ActivitiesView} /> */}
    </ActivitiesStack.Navigator> 
    )
}