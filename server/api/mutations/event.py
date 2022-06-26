from datetime import date
from ariadne import convert_kwargs_to_snake_case
from api import db
from api.models.event import Event
from api.models.user import User
from modules.hash import hash_password

@convert_kwargs_to_snake_case
def createEvent_resolver(obj, info, username, name, event_date, start_time, end_time, lat, lon, activity_id, public):
    try:
        user = User.query.filter(User.username == username).scalar()
        if user:
            today = date.today()
            event = Event(
                name=name,
                date=event_date,
                start_time=start_time,
                end_time=end_time,
                lat=lat,
                lon=lon,
                activity_id=activity_id,
                created_at=today,
                public=public
            )
            db.session.add(event)
            db.session.flush()
            db.session.refresh(event)
            user.event_ids.append(event.id)
            db.session.add(user)
            db.session.commit()
            payload = {
                "success": True,
                "event": event.to_dict()
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
def updateEvent_resolver(obj, info, id, name, date, start_time, end_time, lat, lon, activity_id, public):
    try:
        event = Event.query.get(id)
        if event:
            if name != None:
                event.name = name
            if date != None:
                event.date = date
            if start_time != None:
                event.start_time = start_time
            if end_time != None:
                event.end_time = end_time
            if lon != None:
                event.lon = lon
            if lat != None:
                event.lat = lat
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
