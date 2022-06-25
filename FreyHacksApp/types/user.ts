interface User {
	id: number
	username: string
	display_name: string
	created_at: string
	show_unverified: boolean
	activities: Activity[]
	friends: User[]
	events: ActivityEvent[]
}
