import { createContext } from 'react'

export const UserContext = createContext<{ user: User | null; setUser: (newUser: User|null) => void }>({
	user: null,
	setUser: (newUser:User|null) => {},
})