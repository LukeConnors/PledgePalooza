from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, BackedProject, Project

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# GET all backed projects by userId at '/users/current/backed-projects'

@user_routes.route('/current/backed-projects')
@login_required
def get_all_backed():
    backed_projects =  BackedProject.query.filter(BackedProject.userId == current_user.id).all()
    if backed_projects:
        return {"backed_projects":[project.to_dict() for project in backed_projects]}
    else:
        return jsonify({"error":"This user has not backed any projects"})
