from ariadne import convert_kwargs_to_snake_case, ObjectType
from api.models.user import User
from api.models.activity import Activity
from api.models.event import Event
from api.models.validity import Validity
from app import db

def listUsers():
    try:
        users = [user.to_dict() for user in User.query.all()]
        payload = {
            'success': True,
            'users': users
        }
    except Exception as error:
        payload = {
            'success': False,
            'errors': [str(error)]
        }
    return payload

def listUsers_resolver(obj, info):
   return listUsers()

@convert_kwargs_to_snake_case
def getUser_resolver(obj, info, username):
    try:
        user = User.query.filter(User.username == username).scalar()
        if user:
            payload = {
                "success": True,
                "user": user.to_dict()
            }
        else:
            payload = {
                "success": False,
                "errors": ["user not found"]
            }
    except AttributeError as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload

def getUserEvents(user):
    try:
        validities = db.session.query(Validity).filter(Validity.id.in_(user['validity_ids'])).all()
        events = db.session.query(Event).filter(Event.id.in_(user['event_ids'])).all()
        if not len(validities) == len(events):
            print('warning invalid data')
        for event in events:
            event_validity_found = False
            for validity in validities:
                if validity.event_id == event.id:
                    event.validity = validity
                    event_validity_found = True
            if not event_validity_found:
                print('failed to find matching event and validity')
                return []
        return events
    except Exception as error:
        print('failed to get validities')
        print(str(error))
        return []

def getUserActivities(user):
    try:
        # validities = db.session.query(Validity).filter(Validity.id.in_(user['validity_ids'])).all()
        # if not len(validities) == len(activities):
        #     print('invalid data')
        # for activity in activities:
        #     activity_validity_found = False
        #     for validity in validities:
        #         if validity.activity_id == activity.id:
        #             activity.validity = validity
        #             activity_validity_found = True
        #     if not activity_validity_found:
        #         print('failed to find matching activity and validity')
        #         return []
        activities = Activity.query.filter(Activity.id.in_(user['activity_ids'])).all()
        return activities
    except Exception as error:
        print('failed to get validities')
        print(str(error))
        return []

@convert_kwargs_to_snake_case
def getUser_activities_resolver(obj, info):
    if (isinstance(obj, User)):
        user = obj.to_dict()
    else:
        user = obj
    return getUserActivities(user)

@convert_kwargs_to_snake_case
def getUser_friends_resolver(obj, info):
    if (isinstance(obj, User)):
        user = obj.to_dict()
    else:
        user = obj
    try:
        friends = User.query.filter(User.id.in_(user['friend_ids'])).all()
        return friends
    except Exception as error:
        return []

@convert_kwargs_to_snake_case
def getUser_events_resolver(obj, info):
    if (isinstance(obj, User)):
        user = obj.to_dict()
    else:
        user = obj
    try:
        events = Event.query.filter(Event.id.in_(user['event_ids'])).all()
        return events
    except Exception as error:
        return []