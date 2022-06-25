import { createContext } from 'react'

export const UserContext = createContext<{ user: User | null; setUser: Function }>({
	user: null,
	setUser: () => {},
})

export const ActivitiesContext = createContext<{ activities: Activity[]; setActivities: Function }>({
	activities: [],
	setActivities: () => {},
})
