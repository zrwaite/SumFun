interface NestedUser {
	id: number
	username: string
	display_name: string
	created_at: string
	show_unverified: boolean
}

interface User {
	id: number
	username: string
	display_name: string
	created_at: string
	activities: Activity[]
	show_unverified: boolean
	friends: NestedUser[]
}
