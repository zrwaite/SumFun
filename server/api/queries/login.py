from datetime import date
from ariadne import convert_kwargs_to_snake_case
from api import db
from api.models.user import User
from modules.hash import check_password


@convert_kwargs_to_snake_case
def login_resolver(obj, info, username, password):
    try:
        user = User.query.filter(User.username == username).scalar()
        if user:
            valid_password = check_password(password, user.hash)
            if valid_password:
                payload = {
                    "success": True,
                    "user": user.to_dict()
                }
            else:
                payload = {
                    "success": False,
                    "errors": ["invalid password"]
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
