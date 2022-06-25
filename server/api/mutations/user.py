from datetime import date
from ariadne import convert_kwargs_to_snake_case
import flask_sqlalchemy
from api import db
from api.models.user import User
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
