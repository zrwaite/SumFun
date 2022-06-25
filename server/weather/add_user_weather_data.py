# https://api.openweathermap.org/data/2.5/onecall?lat=44&lon=45&exclude=alerts,minutely,current,daily&units=metric&appid=f722b12944e410c9583e7f5348e4d1cf
# get all users
# for each user:
# get weather data
# get activities
# for each activity:
# use weather data and activity ideal conditions to calculate score
# delete all previous validities
# add new validity scores to database
from api.queries.user import listUsers, getUserActivities
from api.mutations.user import updateUserValidityIds
from api.mutations.validity import deleteValidity, createValidity
from .get_location_weather import get_all_location_weather


def add_user_weather_data(user):
    weather_data = get_all_location_weather(user['lat'], user['lon'])
    activities = getUserActivities(user)
    new_validity_ids = []
    for activity in activities:
        scores = get_score_list(weather_data, activity)
        deleteResult = deleteValidity(activity.validity.id)
        if not deleteResult['success']:
            print('failed to delete data')
        validityResult = createValidity(
            user['username'], scores, activity.id, None)
        if not validityResult['success']:
            print(validityResult['errors'])
            return print("failed to create validity")
        new_validity_ids.append(validityResult['validity']['id'])
    updateUserValidityIds(user['username'], new_validity_ids)


def add_all_users_weather_data():
    userResult = listUsers()
    if not userResult['success']:
        return print("failed to get users")
    users = userResult['users']
    for user in users:
        add_user_weather_data(user)


'''
weather data: 
[{
    "temp": 0,
    "wind_speed": 0,
    "visibility": 0,
    "uvi": 0,
    "pop": 0,
    "feels_like": 0,
    "description": "",
    "icon": ""
}]


activity: {
            "id": self.id,
            "name": self.name,
            "ideal_temp": self.ideal_temp,
            "ideal_wind": self.ideal_wind,
            "rain": self.rain,
            "verified": self.verified,
            "public": self.public,
            "created_at": str(self.created_at.strftime('%d-%m-%Y'))
        }
'''

def get_score(ideal, actual):
    return 10/((0.1*(actual-ideal)**2)+1)

def get_score_list(weather_data, activity):
    # find all weather data within weather_data
    # dictionary with location, hourly, minutely ex as values and lists of dictionaries as values
    # temp, wind speed, visibility and uvi
    # ideal_visibility and ideal_uvi still need to be added, ideal_pop
    scores = []
    ideal_temp = activity.ideal_temp
    ideal_wind_speed = activity.ideal_wind
    ideal_visibility = activity.ideal_visibility
    ideal_uvi = activity.ideal_uvi
    ideal_pop = activity.ideal_pop
    for data in weather_data:
        actual_temp = data['temp']
        temp_validity = get_score(actual_temp, ideal_temp)
        actual_uvi = data['uvi']
        uvi_validity = get_score(actual_uvi, ideal_uvi)
        actual_wind_speed = data['wind_speed']
        wind_speed_validity =get_score(actual_wind_speed, ideal_wind_speed)
        actual_visibility = data['visibility']
        visibility_validity = get_score(actual_visibility, ideal_visibility)
        actual_pop = data['pop']
        pop_validity = get_score(actual_pop, ideal_pop)
        total_validity = (temp_validity+uvi_validity +
                          wind_speed_validity+visibility_validity+pop_validity)/5
        scores.append(total_validity)
    return scores
    # assign needed data to variables
    # compare said variables with ideal conditions
    # take absolute value of the difference between the conditions and find the percent difference between ideal and the change
