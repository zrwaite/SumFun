from apscheduler.schedulers.background import BackgroundScheduler

from weather.add_user_weather_data import add_all_users_weather_data

scheduler = BackgroundScheduler()

job = scheduler.add_job(add_all_users_weather_data,
                        'interval', minutes=1, id='get weather')
scheduler.start()
