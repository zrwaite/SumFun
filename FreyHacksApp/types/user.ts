interface User {
	id: string
	username: string
	display_name: string
	created_at: string
	show_unverified: boolean
	activities: Activity[]
	activity_ids: string[]
	friends: User[]
	events: ActivityEvent[]
	event_ids: string[]
}
