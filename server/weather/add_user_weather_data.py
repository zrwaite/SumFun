# get all users
# for each user:
# get weather data
# get activities
# for each activity:
# use weather data and activity ideal conditions to calculate score
# delete all previous validities
# add new validity scores to database
from api.queries.user import listUsers
from .get_location_weather import get_all_location_weather

def add_user_weather_data(user):
	weather_data = get_all_location_weather(user.lat, user.lon)
	print('gi')

def add_all_users_weather_data():
	userResult = listUsers()
	if not userResult['success']:
		return print("failed to get users")
	users = userResult['users']
	for user in users:
		add_user_weather_data(user)