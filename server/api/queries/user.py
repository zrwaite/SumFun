from ariadne import convert_kwargs_to_snake_case, ObjectType
from api.models.user import User
from api.models.activity import Activity

def listUsers_resolver(obj, info):
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

@convert_kwargs_to_snake_case
def getUser_activities_resolver(obj, info):
    try:
        activities = Activity.query.filter(Activity.id.in_ (obj['activity_ids'])).all()
        return activities
    except Exception as error:
        return []
    return payload