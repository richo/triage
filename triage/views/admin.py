from pyramid.view import view_config
from pyramid.httpexceptions import HTTPFound, HTTPNotFound
from pyramid.renderers import render_to_response
from jinja2 import Markup
from triage.forms import UserLoginSchema, UserRegisterSchema, user_register_validator, user_login_validator
from deform import Form, ValidationFailure
from pyramid.security import remember, forget
from pyramid.security import authenticated_userid
from triage.models import User
from mongoengine.queryset import DoesNotExist


@view_config(route_name='admin_user', permission='authenticated', renderer='admin/users.html')
def admin_user(request):

    return {
        'users': User.objects()
    }

@view_config(route_name='admin_user_edit', permission='authenticated')
def admin_user_edit(request):
    return {}

@view_config(route_name='admin_project', permission='authenticated', renderer='project/list.html')
def admin_project(request):

    return {
        'projects': Project.objects()
    }
