from datetime import date
from ariadne import convert_kwargs_to_snake_case
from database import db
from api.models.user import User
from api.models.activity import Activity
from api.models.event import Event
from modules.hash import hash_password


@convert_kwargs_to_snake_case
def createUser_resolver(obj, info, username, password):
    try:
        prev_user = User.query.filter(User.username == username).scalar()
        if prev_user:
            payload = {
                "success": False,
                "errors": ["username in use"]
            }
        else:
            today = date.today()
            user = User(
                username=username,
                hash=hash_password(password),
                display_name='',
                created_at=today,
                activity_ids=[],
                friend_ids=[],
                event_ids=[],
                validity_ids=[],
                lon=0,
                lat=0,
                show_unverified=False,
            )
            db.session.add(user)
            db.session.commit()
            payload = {
                "success": True,
                "user": user
            }
    except ValueError:
        payload = {
            "success": False,
            "errors": ["Invalid date"]
        }
    return payload


@convert_kwargs_to_snake_case
def updateUser_resolver(obj, info, username, display_name):
    try:
        user = User.query.filter(User.username == username).scalar()
        if user:
            if display_name != None:
                user.display_name = display_name
            db.session.add(user)
            db.session.commit()
            payload = {
                "success": True,
                "user": user.to_dict()
            }
        else:
            payload = {
                "success": False,
                "errors": ['user not found']
            }
    except AttributeError as error:
        payload = {
            "success": False,
            "errors": ["user not found", str(error)]
        }
    return payload


@convert_kwargs_to_snake_case
def deleteUser_resolver(obj, info, id):
    try:
        user = User.query.get(id)
        db.session.delete(user)
        db.session.commit()
        payload = {"success": True, "user": user.to_dict()}
    except AttributeError:
        payload = {
            "success": False,
            "errors": ["user not found"]
        }
    return payload


def updateUserValidityIds(username, validity_ids=[]):
    try:
        user = User.query.filter(User.username == username).scalar()
        if user:
            user.validity_ids = validity_ids
            db.session.add(user)
            db.session.commit()
            payload = {
                "success": True,
                "user": user.to_dict()
            }
        else:
            payload = {
                "success": False,
                "errors": ['user not found']
            }
    except Exception as error:
        payload = {
            "success": False,
            "errors": ["user not found", str(error)]
        }
    return payload


@convert_kwargs_to_snake_case
def subscribeToActivity_resolver(obj, info, id, username):
    try:
        user = User.query.filter(User.username == username).scalar()
        if user:
            activity = Activity.query.get(id)
            if activity:
                if int(id) not in user.activity_ids:
                    user.activity_ids = user.activity_ids + [id]
                    db.session.add(user)
                    db.session.commit()
                    payload = {
                        "success": True,
                    }
                else:
                    payload = {
                        "success": False,
                        "errors": ["you are already subscribed"]
                    }
            else:
                payload = {
                    "success": False,
                    "errors": ['activity not found']
                }
        else:
            payload = {
                "success": False,
                "errors": ['user not found']
            }
    except AttributeError as error:
        payload = {
            "success": False,
            "errors": ["user not found", str(error)]
        }
    return payload


@convert_kwargs_to_snake_case
def registerForEvent_resolver(obj, info, id, username):
    try:
        user = User.query.filter(User.username == username).scalar()
        if user:
            event = Event.query.get(id)
            if event:
                if int(id) not in user.event_ids:
                    user.event_ids = user.event_ids + [id]
                    db.session.add(user)
                    db.session.commit()
                    payload = {
                        "success": True,
                    }
                else:
                    payload = {
                        "success": False,
                        "errors": ["you are already registered"]
                    }
            else:
                payload = {
                    "success": False,
                    "errors": ['activity not found']
                }
        else:
            payload = {
                "success": False,
                "errors": ['user not found']
            }
    except AttributeError as error:
        payload = {
            "success": False,
            "errors": ["user not found", str(error)]
        }
    return payload


@convert_kwargs_to_snake_case
def unsubscribeFromActivity_resolver(obj, info, id, username):
    try:
        user = User.query.filter(User.username == username).scalar()
        print(user.activity_ids)
        print(type(id))
        print(type(user.activity_ids[0]))
        if user:
            if int(id) not in user.activity_ids:
                payload = {
                    "success": False,
                    "errors": ['you arent subscribed']
                }
            else:
                new_activity_ids = user.activity_ids.copy()
                new_activity_ids.remove(int(id))
                user.activity_ids = new_activity_ids
                db.session.add(user)
                db.session.commit()
                payload = {
                    "success": True,
                }
        else:
            payload = {
                "success": False,
                "errors": ['user not found']
            }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload


@convert_kwargs_to_snake_case
def unregisterFromEvent_resolver(obj, info, id, username):
    try:
        user = User.query.filter(User.username == username).scalar()
        if user:
            if int(id) not in user.event_ids:
                payload = {
                    "success": False,
                    "errors": ['you arent registered']
                }
            else:
                new_event_ids = user.event_ids.copy()
                new_event_ids.remove(int(id))
                user.event_ids = new_event_ids
                db.session.add(user)
                db.session.commit()
                payload = {
                    "success": True,
                }
        else:
            payload = {
                "success": False,
                "errors": ['user not found']
            }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload
