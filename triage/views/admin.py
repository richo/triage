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


@view_config(route_name='user_admin', permission='authenticated', renderer='admin/users.html')
def user_admin(request):

    return {
        'users': User.objects()
    }


@view_config(route_name='project_admin', permission='authenticated', renderer='project/list.html')
def project_admin(request):

    return {
        'projects': Project.objects()
    }
