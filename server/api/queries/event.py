from ariadne import convert_kwargs_to_snake_case
from traceback import print_exc
from api.models.event import Event

def listEvents_resolver(obj, info):
    try:
        events = [event.to_dict() for event in Event.query.all()]
        print(events)
        payload = {
            'success': True,
            'events': events
        }
    except Exception as error:
        print(error)
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
