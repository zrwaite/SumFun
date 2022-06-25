from datetime import date
from ariadne import convert_kwargs_to_snake_case
from api import db
from api.models.activity import Activity
from api.models.user import User
from modules.hash import hash_password

	# createActivity(name: String!, ideal_temp: Int!, ideal_wind: Int!, rain: RAIN!): ActivityResult!

@convert_kwargs_to_snake_case
def createActivity_resolver(obj, info, username, name, ideal_temp, ideal_wind, rain, ideal_pop, ideal_visibility, ideal_uvi):
    try:
        prev_activity = Activity.query.filter(Activity.name == name).scalar()
        if prev_activity:
            payload = {
                "success": False,
                "errors": ["name in use"]
            }
        else:
            user = User.query.filter(User.username == username).scalar()
            if user:
                today = date.today()
                activity = Activity(
                    name=name,
                    ideal_temp=ideal_temp,
                    ideal_wind=ideal_wind,
                    ideal_visibility=ideal_visibility,
                    ideal_pop=ideal_pop,
                    ideal_uvi=ideal_uvi,
                    rain=rain,
                    created_at=today,
                    verified=False,
                    public=False
                )
                db.session.add(activity)
                db.session.flush()
                db.session.refresh(activity)
                user.activity_ids.append(activity.id)
                db.session.add(user)
                db.session.commit()
                payload = {
                    "success": True,
                    "activity": activity.to_dict()
                }
            else: 
                payload = {
                    "success": False,
                    "errors": ['user not found']
                }
    except ValueError:
        payload = {
            "success": False,
            "errors": ["Invalid date"]
        }
    return payload


@convert_kwargs_to_snake_case
def updateActivity_resolver(obj, info, id, ideal_temp, ideal_wind, ideal_visibility, ideal_pop, ideal_uvi, rain):
    try:
        activity = User.query.get(id)
        if activity:
            if ideal_temp != None:
                activity.ideal_temp = ideal_temp
            if ideal_wind != None:
                activity.ideal_wind = ideal_wind
            if ideal_visibility != None:
                activity.ideal_visibility = ideal_visibility
            if ideal_pop != None:
                activity.ideal_pop = ideal_pop
            if ideal_uvi != None:
                activity.ideal_uvi = ideal_uvi
            if rain != None:
                activity.rain = rain
            db.session.add(activity)
            db.session.commit()
            payload = {
                "success": True,
                "activity": activity.to_dict()
            }
        else:
            payload = {
                "success": False,
                "errors": ['activity not found']
            }
    except AttributeError as error:
        payload = {
            "success": False,
            "errors": ["activity not found", str(error)]
        }
    return payload


@convert_kwargs_to_snake_case
def deleteActivity_resolver(obj, info, id):
    try:
        activity = Activity.query.get(id)
        db.session.delete(activity)
        db.session.commit()
        payload = {"success": True}
    except AttributeError:
        payload = {
            "success": False,
            "errors": ["activity not found"]
        }
    return payload
