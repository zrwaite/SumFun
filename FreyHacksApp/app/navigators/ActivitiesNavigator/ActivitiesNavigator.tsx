import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ActivitiesLandingView } from '../../screens/ActivitiesLandingView'
import { ActivitiesView } from '../../screens/ActivitiesView'
import { ActivityView } from '../../screens/ActivityView'
import { CreateActivityView } from '../../screens/CreateActivityView'
import { MyActivitiesView } from '../../screens/MyActivitiesView'
const ActivitiesStack = createNativeStackNavigator() as any

export const ActivitiesNavigator = () => {
    return (
        <ActivitiesStack.Navigator>
            <ActivitiesStack.Screen name="Activities Home" component={ActivitiesLandingView} />             
            <ActivitiesStack.Screen name="All Activities" component={ActivitiesView} />             
            <ActivitiesStack.Screen name="Activity" component={ActivityView} />
            <ActivitiesStack.Screen name="My Activities" component={MyActivitiesView} />
            <ActivitiesStack.Screen name="Create Activity" component={CreateActivityView} />
        </ActivitiesStack.Navigator>
    )
}