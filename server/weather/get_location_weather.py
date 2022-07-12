from urllib.request import urlopen
import json
from config import env


def get_all_location_weather(lat, lon):
    weather_api_key = env['WEATHER_API_KEY']
    url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + \
        str(lat)+"&lon="+str(lon) + \
        "&exclude=alerts,minutely&units=metric&appid="+weather_api_key
    response = urlopen(url)
    data_json = json.loads(response.read())
    return get_12_timeframe_average(data_json)


def get_12_timeframe_average(weather_data):
    new_weather_data = []
    for i1 in range(12):
        descriptions = []
        icons = []
        weather_average = {
            "temp": 0,
            "wind_speed": 0,
            "visibility": 0,
            "uvi": 0,
            "pop": 0,
            "feels_like": 0,
            "description": "",
            "icon": ""
        }
        for i2 in range(4):
            hour = weather_data['hourly'][i1*4 + i2]
            weather_average['temp'] += hour['temp']/4
            weather_average['wind_speed'] += hour['wind_speed']/4
            weather_average['visibility'] += hour['visibility']/4
            weather_average['pop'] += hour['pop']/4
            weather_average['uvi'] += hour['uvi']/4
            weather_average['feels_like'] += hour['feels_like']/4
            descriptions.append(hour['weather'][0]['description'])
            icons.append(hour['weather'][0]['icon'])
        weather_average['description'] = average_description(descriptions)
        weather_average['icon'] = average_description(icons)
        new_weather_data.append(weather_average)

    return new_weather_data


def average_description(descriptions):
    different_weather = set()
    for i in range(4):
        different_weather.add(i)
    if len(different_weather) == 4:
        return descriptions[1]
    return max(set(descriptions), key=descriptions.count)
