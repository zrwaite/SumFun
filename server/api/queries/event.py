from ariadne import convert_kwargs_to_snake_case
from api.models.event import Event
from api.models.activity import Activity

def listEvents_resolver(obj, info):
    try:
        events = [event.to_dict() for event in Event.query.all()]
        payload = {
            'success': True,
            'events': events
        }
    except Exception as error:
        payload = {
            'success': False,
            'errors': [str(error)]
        }
    return payload

@convert_kwargs_to_snake_case
def getEvent_resolver(obj, info, id):
    try:
        event = Event.query.get(id)
        if event:
            payload = {
                "success": True,
                "event": event.to_dict()
            }
        else:
            payload = {
                "success": False,
                "errors": ["event not found"]
            }
    except AttributeError as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload

def getEventActivity(event):
    try:
        activity = Activity.query.filter(Activity.id == event['activity_id']).scalar()
        return activity
    except Exception as error:
        return None

@convert_kwargs_to_snake_case
def getEvent_activity_resolver(obj, info):
    if (isinstance(obj, Event)):
        event = obj.to_dict()
    else:
        event = obj
    return getEventActivity(event)