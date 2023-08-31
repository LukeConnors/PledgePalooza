from flask import Blueprint, request, jsonify
from app.models import db, Image, User, Project
from flask_login import current_user, login_required
from app.api.helper_aws import (
    upload_file_to_s3, get_unique_filename)
from app.forms.image_form import ImageForm


project_routes = Blueprint('projects', __name__)

# Routes
# !!!!!!!!!!!!! Projects CRUD !!!!!!!!!!!!!!!!!!!

# GET all projects at '/projects/'
@project_routes.route('/')
def all_projects():
    """
    Query for all projects and returns them in a list of user dictionaries
    """
    projects = Project.query.all()

    return {"project":[project.to_dict() for project in projects]}


# POST a project for authenticated user '/projects'

# GET all projects owned by current user '/projects/my-projects'

@project_routes.route('/my-projects')
@login_required
def my_projects():
    projects = Project.query.filter(current_user.id == Project.ownerId).all()

    return {"my_projects": [project.to_dict() for project in projects]}

# GET a project's details '/projects/:id'

@project_routes.route('/<int:id>')
def project_details(id):
    project = Project.query.get(id)
    return project.to_dict()

# PUT a project's details (authenticated user) '/projects/:id'

# DELETE a project by projectId '/projects/:id'

# POST a banner image to a project (authenticated user) '/projects/:id/banner-image'

# POST description images to a project (authenticated user) '/projects/:id/description-images'


# !!!!!!!!!!!!! Rewards CRUD !!!!!!!!!!!!!!!!!!!

# GET rewards by projectId at '/projects/:project-id/rewards-

# POST a reward by projectId at '/projects/:project-id/rewards' (auth user)

# UPDATE a reward by rewardId at '/projects/:project-id/rewards/:reward-id' (auth user)

# DELETE a reward by rewardId at '/projects/:project-id/rewards/:reward-id' (auth user)


# !!!!!!!!!!!!!!! Backed CRU(no D) !!!!!!!!!!!!!!

# POST backed status by projectId at '/projects/:project-id/back' (auth user)

# PUT backed amount by projectId at '/projects/:project-id/back'  (auth user)
