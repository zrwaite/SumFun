from ariadne import convert_kwargs_to_snake_case, ObjectType
from traceback import print_exc
from api.models.activity import Activity


def listActivities_resolver(obj, info):
    try:
        activities = [activity.to_dict() for activity in Activity.query.all()]
        print(activities)
        payload = {
            'success': True,
            'activities': activities
        }
    except Exception as error:
        print(error)
        payload = {
            'success': False,
            'errors': [str(error)]
        }
    return payload


@convert_kwargs_to_snake_case
def getActivity_resolver(obj, info, id):
    try:
        activity = Activity.query.get(id)
        if activity:
            payload = {
                "success": True,
                "activity": activity.to_dict()
            }
        else:
            payload = {
                "success": False,
                "errors": ["activity not found"]
            }
    except AttributeError as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload
