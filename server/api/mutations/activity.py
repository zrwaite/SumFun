from datetime import date
from ariadne import convert_kwargs_to_snake_case
from api import db
from api.models.activity import Activity
from api.models.user import User
from modules.hash import hash_password

	# createActivity(name: String!, min_temp: Int!, max_temp: Int!, min_wind: Int!, max_wind: Int!, rain: RAIN!): ActivityResult!

@convert_kwargs_to_snake_case
def createActivity_resolver(obj, info, username, name, min_temp, max_temp, min_wind, max_wind, rain):
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
                    min_temp=min_temp,
                    max_temp=max_temp,
                    min_wind=min_wind,
                    max_wind=max_wind,
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
def updateActivity_resolver(obj, info, id, min_temp, max_temp, min_wind, max_wind, rain):
    try:
        activity = User.query.get(id)
        if activity:
            if min_temp != None:
                activity.min_temp = min_temp
            if max_temp != None:
                activity.max_temp = max_temp
            if min_wind != None:
                activity.min_wind = min_wind
            if max_wind != None:
                activity.max_wind = max_wind
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
