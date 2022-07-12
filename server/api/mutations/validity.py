from datetime import date
from ariadne import convert_kwargs_to_snake_case
from database import db
from api.models.validity import Validity
from api.models.user import User


def deleteValidity(id):
    try:
        validity = Validity.query.get(id)
        db.session.delete(validity)
        db.session.commit()
        payload = {"success": True}
    except AttributeError:
        payload = {
            "success": False,
            "errors": ["validity not found"]
        }
    return payload


@convert_kwargs_to_snake_case
def deleteValidity_resolver(obj, info, id):
    return deleteValidity(id)


def createValidity(username, scores, activity_id, event_id):
    try:
        user = User.query.filter(User.username == username).scalar()
        if user:
            validity = Validity(
                scores=scores,
                activity_id=activity_id,
                event_id=event_id
            )
            db.session.add(validity)
            db.session.flush()
            db.session.refresh(validity)
            user.validity_ids.append(validity.id)
            db.session.add(user)
            db.session.commit()
            payload = {
                "success": True,
                "validity": validity.to_dict()
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
def createValidity_resolver(obj, info, username, scores, activity_id, event_id):
    return createValidity(username, scores, activity_id, event_id)
