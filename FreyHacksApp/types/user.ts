interface User {
	id: number
	username: string
	display_name: string
	created_at: string
	show_unverified: boolean
	activities: Activity[]
	activity_ids: number[]
	friends: User[]
	events: ActivityEvent[]
	event_ids: number[]
}
