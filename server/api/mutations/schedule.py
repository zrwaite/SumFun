from datetime import date
from ariadne import convert_kwargs_to_snake_case
from database import db
from api.models.schedule import Schedule
from modules.hash import hash_password


@convert_kwargs_to_snake_case
def createSchedule_resolver(obj, info, monday_start, monday_end, tuesday_start, tuesday_end, wednesday_start, wednesday_end, thursday_start, thursday_end, friday_start, friday_end, saturday_start, saturday_end, sunday_start, sunday_end):
    try:
        schedule = Schedule(
            monday_start=monday_start,
            monday_end=monday_end,
            tuesday_start=tuesday_start,
            tuesday_end=tuesday_end,
            wednesday_start=wednesday_start,
            wednesday_end=wednesday_end,
            thursday_start=thursday_start,
            thursday_end=thursday_end,
            friday_start=friday_start,
            friday_end=friday_end,
            saturday_start=saturday_start,
            saturday_end=saturday_end,
            sunday_start=sunday_start,
            sunday_end=sunday_end
        )
        payload = {
            'success': False,
            'schedule': schedule
        }
    except Exception as error:
        payload = {
            'success': False,
            'errors': [str(error)]
        }
    return payload


@convert_kwargs_to_snake_case
def updateSchedule_resolver(obj, info, monday_start, monday_end, tuesday_start, tuesday_end, wednesday_start, wednesday_end, thursday_start, thursday_end, friday_start, friday_end, saturday_start, saturday_end, sunday_start, sunday_end):
    try:
        schedule = Schedule.query.get(id)
        schedule.monday_start = monday_start,
        schedule.monday_end = monday_end,
        schedule.tuesday_start = tuesday_start,
        schedule.tuesday_end = tuesday_end,
        schedule.wednesday_start = wednesday_start,
        schedule.wednesday_end = wednesday_end,
        schedule.thursday_start = thursday_start,
        schedule.thursday_end = thursday_end,
        schedule.friday_start = friday_start,
        schedule.friday_end = friday_end,
        schedule.saturday_start = saturday_start,
        schedule.saturday_end = saturday_end,
        schedule.sunday_start = sunday_start,
        schedule.sunday_end = sunday_end
        payload = {
            'success': True,
            'schedule': schedule
        }
    except Exception as error:
        payload = {
            'success': False,
            'errors': [str(error)]
        }
    return payload
