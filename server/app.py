from api import app, db
from ariadne import load_schema_from_path, make_executable_schema, \
    graphql_sync, snake_case_fallback_resolvers, ObjectType, QueryType, MutationType
from ariadne.constants import PLAYGROUND_HTML
from flask import request, jsonify

from api.queries.user import listUsers_resolver, getUser_resolver, getUser_activities_resolver
from api.mutations.user import createUser_resolver, updateUser_resolver, deleteUser_resolver

from api.queries.login import login_resolver

from api.queries.activity import listActivities_resolver, getActivity_resolver
from api.mutations.activity import createActivity_resolver, updateActivity_resolver, deleteActivity_resolver
query = QueryType()
mutation = MutationType()

@query.field('health')
def health(obj, info):
    return "Working!"


@query.field('listUsers')
def listUsers(obj, info):
    return listUsers_resolver(obj, info)


@query.field('getUser')
def getUser(obj, info, username):
    return getUser_resolver(obj, info, username)


@mutation.field('createUser')
def createUser(obj, info, username, password):
    return createUser_resolver(obj, info, username, password)


@mutation.field('deleteUser')
def deleteUser(obj, info, id):
    return deleteUser_resolver(obj, info, id)


@mutation.field('updateUser')
def updateUser(obj, info, id, username, display_name):
    return updateUser_resolver(obj, info, id, username, display_name)

@query.field('login')
def login(obj, info, username, password):
    return login_resolver(obj, info, username, password)



@query.field('listActivities')
def listActivities(obj, info):
    return listActivities_resolver(obj, info)


@query.field('getActivity')
def getActivity(obj, info, id):
    return getActivity_resolver(obj, info, id)


@mutation.field('createActivity')
def createActivity(obj, info, name, min_temp, max_temp, min_wind, max_wind, rain):
    return createActivity_resolver(obj, info, name, min_temp, max_temp, min_wind, max_wind, rain)


@mutation.field('deleteActivity')
def deleteActivity(obj, info, id):
    return deleteActivity_resolver(obj, info, id)


@mutation.field('updateActivity')
def updateActivity(obj, info, id, min_temp, max_temp, min_wind, max_wind, rain):
    return updateActivity_resolver(obj, info, id, min_temp, max_temp, min_wind, max_wind, rain)

user = ObjectType('User')

@user.field('activities')  
def getUser_activities(obj, info):
    return getUser_activities_resolver(obj, info)

type_defs = load_schema_from_path("schema.graphql")
schema = make_executable_schema(
    type_defs, query, mutation, user, snake_case_fallback_resolvers
)


@app.route("/graphql", methods=["GET"])
def graphql_playgorund():
    return PLAYGROUND_HTML, 200


@app.route("/graphql", methods=["POST"])
def graphql_server():
    data = request.get_json()
    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        debug=app.debug
    )
    status_code = 200 if success else 400
    return jsonify(result), status_code