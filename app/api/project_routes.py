from flask import Blueprint, request, jsonify, redirect
from app.models import db, Image, User, Project, Reward, Category
from app.forms.project_form import ProjectForm
from flask_login import current_user, login_required
from app.api.helper_aws import (
    upload_file_to_s3, get_unique_filename)
from app.forms.image_form import ImageForm
from .helper_aws import upload_file_to_s3
from datetime import date


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
@project_routes.route('/', methods=["POST"])
@login_required
def post_form():
    """
    Create a new project for an authenticated user
    """
    form = ProjectForm()
    if form.validate_on_submit():
        new_project = Project(
            name = form.data["name"],
            description = form.data["description"],
            location = form.data["location"],
            categoryId = form.data["categoryId"],
            bannerImg = form.data["bannerImg"],
            endDate = form.data["endDate"],
            ownerId = current_user.id
        )
        db.session.add(new_project)
        db.session.commit()

        return new_project.to_dict()

    else:
        return jsonify({"error": "Invalid form data", "form errors": form.errors}), 400


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

@project_routes.route('/<int:id>', methods=["PUT"])
@login_required  # Change the route and method to PUT
def edit_project_form(id):
    """
    Update an existing project for an authenticated user
    """
    form = ProjectForm()
    if form.validate_on_submit():
        project = Project.query.get(id)  # Get the existing project by its ID
        if project:
            # Update the project's attributes with the new data
            project.name = form.data["name"]
            project.description = form.data["description"]
            project.location = form.data["location"]
            project.categoryId = form.data["categoryId"]
            project.bannerImg = form.data["bannerImg"]
            project.endDate = form.data["endDate"]
            # No need to update ownerId; it should remain the same

            db.session.commit()

            return project.to_dict()
        else:
            return jsonify({"error": "Project not found"}), 404
    else:
        return jsonify({"error": "Invalid form data", "form errors": form.errors}), 400

# DELETE a project by projectId '/projects/:id'



# POST description images to a project (authenticated user) '/projects/:id/description-images'

# @project_routes('/projects/<int:id>/description-images')
# @login_required
# def description_images(id):
#     form = ImageForm()
#     if form.validate_on_submit():
#        image = upload_file_to_s3(form.image)
#       new_image = Image(
#             url = image.url
#             imagable_id = id,
#             imageable_type = "project"
#         )


# !!!!!!!!!!!!! Rewards CRUD !!!!!!!!!!!!!!!!!!!

# GET rewards by projectId at '/projects/:project-id/rewards'
@project_routes.route('/<int:id>/rewards')
def project_rewards(id):
    rewards = Reward.query.filter(Reward.projectId == id).all()
    return {'rewards': [reward.to_dict() for reward in rewards]}

# POST a reward by projectId at '/projects/:project-id/rewards' (auth user)

# UPDATE a reward by rewardId at '/projects/:project-id/rewards/:reward-id' (auth user)

# DELETE a reward by rewardId at '/projects/:project-id/rewards/:reward-id' (auth user)


# !!!!!!!!!!!!!!! Backed CRU(no D) !!!!!!!!!!!!!!

# POST backed status by projectId at '/projects/:project-id/back' (auth user)
@project_routes.route('/<int:id>/back')
@login_required
def back_project(id):
    project = Project.query.get(id)
    rewards = Reward.query.filter(project.id == Reward.projectId)

# PUT backed amount by projectId at '/projects/:project-id/back'  (auth user)
