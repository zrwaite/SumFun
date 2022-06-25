from datetime import date
from ariadne import convert_kwargs_to_snake_case
from api import db
from api.models.event import Event
from modules.hash import hash_password

# createActivity(name: String!, min_temp: Int!, max_temp: Int!, min_wind: Int!, max_wind: Int!, rain: RAIN!): ActivityResult!

@convert_kwargs_to_snake_case
def createEvent_resolver(obj, info, name, event_date, start_time, duration, location, activity_id, public):
    try:
        today = date.today()
        event = Event(
            name=name,
            date=event_date,
            start_time=start_time,
            duration=duration,
            location=location,
            activity_id=activity_id,
            created_at=today,
            public=public
        )
        db.session.add(event)
        db.session.commit()
        payload = {
            "success": True,
            "event": event.to_dict()
        }
    except ValueError:
        payload = {
            "success": False,
            "errors": ["Invalid date"]
        }
    return payload

@convert_kwargs_to_snake_case
def updateEvent_resolver(obj, info, id, name, date, start_time, duration, location, activity_id, public):
    try:
        event = Event.query.get(id)
        if event:
            if name != None:
                event.name = name
            if date != None:
                event.date = date
            if start_time != None:
                event.start_time = start_time
            if duration != None:
                event.duration = duration
            if location != None:
                event.location = location
            if activity_id != None:
                event.activity_id = activity_id
            if public != None:
                event.public = public
            db.session.add(event)
            db.session.commit()
            payload = {
                "success": True,
                "event": event.to_dict()
            }
        else:
            payload = {
                "success": False,
                "errors": ['event not found']
            }
    except AttributeError as error:
        payload = {
            "success": False,
            "errors": ["event not found", str(error)]
        }
    return payload


@convert_kwargs_to_snake_case
def deleteEvent_resolver(obj, info, id):
    try:
        event = Event.query.get(id)
        db.session.delete(event)
        db.session.commit()
        payload = {"success": True}
    except AttributeError:
        payload = {
            "success": False,
            "errors": ["event not found"]
        }
    return payload
