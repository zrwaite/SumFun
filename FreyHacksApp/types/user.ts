interface User {
	id: number
	username: string
	display_name: string
	created_at: string
	activities: Activity[]
	show_unverified: boolean
	friends: User[]
	events: ActivityEvent[]
}
