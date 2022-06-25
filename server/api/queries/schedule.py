from ariadne import convert_kwargs_to_snake_case
from api.models.schedule import Schedule

@convert_kwargs_to_snake_case
def getSchedule_resolver(obj, info, id):
    try:
        schedule = Schedule.query.get(id)
        if schedule:
            payload = {
                "success": True,
                "schedule": schedule.to_dict()
            }
        else:
            payload = {
                "success": False,
                "errors": ["schedule not found"]
            }
    except AttributeError as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload