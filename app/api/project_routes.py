from flask import Blueprint, request, jsonify, redirect
from app.models import db, Image, User, Project, Reward, Category, BackedProject, Like
from app.forms.project_form import ProjectForm
from app.forms.reward_form import RewardForm
from app.forms.back_form import BackForm
from flask_login import current_user, login_required
from app.api.helper_aws import (
    upload_file_to_s3, get_unique_filename)
from app.forms.image_form import ImageForm
from .helper_aws import upload_file_to_s3
from datetime import date
from sqlalchemy import and_
from sqlalchemy.orm import aliased


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

    return {"projects":[project.to_dict() for project in projects]}

@project_routes.route('/category/<int:id>')
def project_by_category(id):
    projects = Project.query.filter(Project.categoryId == id).all()
    return {'projects': [project.to_dict() for project in projects]}

# POST a project for authenticated user '/projects'
@project_routes.route('/', methods=["POST"])
def post_form():
    """
    Create a new project for an authenticated user
    """
    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Get the file from the request
        banner_img = request.files['bannerImg']

        # Check if a file was uploaded
        if banner_img:
            # Generate a unique filename for the image
            unique_filename = get_unique_filename(banner_img.filename)

            # Upload the file to S3 and get the URL
            image_url = upload_file_to_s3(banner_img)

            # Set the `bannerImg` field of the project to the S3 URL
            new_project = Project(
                name=form.data["name"],
                description=form.data["description"],
                location=form.data["location"],
                categoryId=form.data["categoryId"],
                summary=form.data["summary"],
                bannerImg=image_url["url"],  # Use the S3 URL here
                endDate=form.data["endDate"],
                ownerId=current_user.id
            )
            print("THIS IS THE NEW PROJECT", new_project)
        db.session.add(new_project)
        db.session.commit()

        return new_project.to_dict()

    else:
        print("FORM ERRORS!", form.errors)
        return jsonify({"error": "Invalid form data", "form_errors": form.errors}), 400



# GET all projects owned by current user '/projects/my-projects'

@project_routes.route('/my-projects')
@login_required
def my_projects():
    projects = Project.query.filter(current_user.id == Project.ownerId).all()

    return {"my_projects": [project.to_dict() for project in projects]}


# GET a project by search query
@project_routes.route('/project_search')
def get_projects_name():
    query = request.args.get("query", "").lower()
    projects = Project.query.filter(Project.name.ilike(f"{query}%")).all()
    return {"projects": [project.to_dict() for project in projects]}


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
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        project = Project.query.get(id)  # Get the existing project by its ID
        banner_img = request.files.get("bannerImg")  # Use get() to make it optional
        if project:
            # Update the project's attributes with the new data
            if form.data.get("name"):
                project.name = form.data["name"]
            if form.data.get("description"):
                project.description = form.data["description"]
            if form.data.get("location"):
                project.location = form.data["location"]
            if form.data.get("summary"):
                project.summary = form.data["summary"]
            if form.data.get("categoryId"):
                project.categoryId = form.data["categoryId"]
            if banner_img:
                image_url = upload_file_to_s3(banner_img)
                project.bannerImg = image_url["url"]
            if form.data.get("endDate"):
                project.endDate = form.data["endDate"]

            db.session.commit()

            return project.to_dict()
        else:
            return jsonify({"error": "Project not found"}), 404
    else:
        return jsonify({"error": "Invalid form data", "form_errors": form.errors}), 400

# DELETE a project by projectId '/projects/:id'
@project_routes.route('/<int:id>', methods=["DELETE"])
@login_required  # Change the route and method to PUT
def delete_project(id):
    """
    Update an existing project for an authenticated user

    """
    project = Project.query.get(id)  # Get the existing project by its ID

    if not project:
        return jsonify({"error": "Project not found"})

    if project.ownerId == current_user.id:
        db.session.delete(project)
        db.session.commit()

        return jsonify({"Message": "Successfully Deleted!"})

    else:
        return jsonify({"error": "Unauthorized Action", "form_errors": form.errors}), 400
# POST description images to a project (authenticated user) '/projects/:id/description-images'

@project_routes.route('/<int:id>/des-images', methods=["POST"])
@login_required
def description_images(id):
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        img = request.files['url']
        if img:
            img_url = upload_file_to_s3(img)
            new_image = Image(
            url = img_url["url"],
            imageable_id = id,
            imageable_type = "project"
            )

        db.session.add(new_image)
        db.session.commit()

        return new_image.to_dict()

#  Get all description images route

@project_routes.route('/<int:id>/des-images')
def get_all_description_images(id):

    project = Project.query.get(id)
    if project:
        descImage = Image.query.filter_by(imageable_id=project.id, imageable_type="project").all()
        descImages = [descImage.to_dict() for descImage in descImage]
        return descImages


# !!!!!!!!!!!!! Rewards CRUD !!!!!!!!!!!!!!!!!!!

# GET rewards by projectId at '/projects/:project-id/rewards'
@project_routes.route('/<int:id>/rewards')
def project_rewards(id):
    image_alias = aliased(Image)
    rewards = (
        db.session.query(Reward, image_alias)
        .outerjoin(image_alias, and_(
            Reward.id == image_alias.imageable_id,
            image_alias.imageable_type == "reward"
        ))
        .filter(Reward.projectId == id)
        .all()
    )
    return {'rewards': [reward[0].to_dict() for reward in rewards]}

# POST a reward by projectId at '/projects/:project-id/rewards' (auth user)
@project_routes.route('/<int:id>', methods=["POST"])
@login_required  # Change the route and method to PUT
def add_reward_form(id):
    """
    Add a reward for an existing project for an authenticated user
    """
    form = RewardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        project = Project.query.get(id)
        if project:
            # Update the project's attributes with the new data
            new_reward = Reward(
            projectId = project.id,
            name = form.data["name"],
            description = form.data["description"],
            price = form.data["price"],
            est_delivery = form.data["est_delivery"],
            quantity = form.data["quantity"],
            )
        db.session.add(new_reward)
        db.session.commit()

        return new_reward.to_dict()
    else:
        return jsonify({"error": "Invalid form data", "form_errors": form.errors}), 400
# UPDATE a reward by rewardId at '/projects/:project-id/rewards/:reward-id' (auth user)
@project_routes.route('/<int:projectId>/rewards/<int:rewardId>', methods=['PUT'])
@login_required
def update_reward(projectId, rewardId):
    form = RewardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        reward = Reward.query.get(rewardId)
        if reward:
            reward.name = form.data["name"]
            reward.description = form.data["description"]
            reward.price = form.data["price"]
            reward.est_delivery = form.data["est_delivery"]
            reward.quantity = form.data["quantity"]

            db.session.commit()

            return reward.to_dict()
        else:
            return jsonify({"error": "Reward not found"}), 404
    else:
        return jsonify({"error": "Invalid form data", "form_errors": form.errors})

# DELETE a reward by rewardId at '/projects/:project-id/rewards/:reward-id' (auth user)

@project_routes.route('/<int:projectId>/rewards/<int:rewardId>', methods=["DELETE"])
@login_required
def delete_reward(projectId, rewardId):
    """
    Delete an existing reward associated with a project for an authenticated user
    """

    project = Project.query.get(projectId)  # Get the existing project by its ID
    if not project:
        return jsonify({"error": "Project not found"}), 404

    if project.ownerId != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    reward = Reward.query.get(rewardId)
    if not reward:
        return jsonify({"error": "Reward not found"})

    if project.id != reward.projectId:
        return jsonify({"error": "Reward does not belong to this project"})

    db.session.delete(reward)
    db.session.commit()

    return jsonify({"Message": "Successfully Deleted!"})



# !!!!!!!!!!!!!!! Backed CRU(no D) !!!!!!!!!!!!!!

# POST backed status by projectId at '/projects/:project-id/back' (auth user)

@project_routes.route('/<int:id>/back', methods=["POST"])
@login_required
def post_backed(id):
    form = BackForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        project = Project.query.get(id)
        rewards = Reward.query.filter(project.id == Reward.projectId).all()
        if project:
            new_back = BackedProject(
                cost = form.data["cost"],
                projectId = project.id,
                rewardId = None,
                userId = current_user.id
            )
            count = 0
            for reward in rewards:
                if(reward.price <= new_back.cost and reward.price > count):
                    count = reward.price
                    new_back.rewardId = reward.id
            db.session.add(new_back)
            db.session.commit()

            return new_back.to_dict()
        else:
            return jsonify({"error": "Project does not exist"})

    else:
        return jsonify({"error": "Invalid form data", "form.errors": form.errors})


# PUT backed amount by projectId at '/projects/:project-id/back'  (auth user)

@project_routes.route('/<int:id>/back', methods=["PUT"])
@login_required
def update_project(id):
    form = BackForm()
    if form.validate_on_submit():
        project = Project.query.get(id)
        rewards = Reward.query.filter(project.id == Reward.projectId).all()
        back = BackedProject.query.filter(current_user.id == BackedProject.userId).first()
        if project:
            back.cost = form.data["cost"]
            for reward in rewards:
                count = 0
                if(reward.price <= back.cost and reward.price > count):
                    count = reward.price
                    back.rewardId = reward.id
            db.session.commit()
            return back.to_dict()
        else:
            return jsonify({"error": "Project does not exist"})
        


@project_routes.route('/<int:id>/likes')
def individual_project_likes(id):
    """
    Query for all likes belonging to a specific project
    """
    project = Project.query.get(id)
    if project:
        likes = Like.query.filter(Like.projectId == id).all()
        return {'likes':[like.to_dict() for like in likes]}
    else:
        return jsonify({"error": "Project not found"}, 404)
    
# A user should be able to delete or unlike a like they given to a project

@project_routes.route('/<int:id>/likes', methods=["DELETE"])
@login_required
def unlike_project(id):
    project = Project.query.get(id)
    if not project:
        return jsonify({"error": "Project not found"}), 404
    
    like = Like.query.filter_by(userId=current_user.id, projectId=id).first()
    if like:
        db.session.delete(like)
        db.session.commit()
        return jsonify({"message": "Successfully unliked the project", "likeId": like.id}), 200
    else:
        return jsonify({"error": "Like not found"}), 404
    
# A user should be able to like projects belonging to other users, can only like a project once and cant like their own project
@project_routes.route('/<int:id>/likes', methods=["POST"])
@login_required
def like_project(id):
    project =  Project.query.get(id)
    if not project:
        return jsonify({"error": "Project not found"}), 404
    
    if current_user.id == project.ownerId:
        return jsonify({"error": "You cannot like your own project"}), 403
    
    already_liked = Like.query.filter_by(userId=current_user.id, projectId=id).first()
    if already_liked:
        return jsonify({"error": "You have already liked this project"}), 400
    
    new_like = Like(userId=current_user.id, projectId=id)
    db.session.add(new_like)
    db.session.commit()

    return jsonify({"message": "Successfully liked the project", "like": new_like.to_dict()}), 201
# Get all likes belonging to the current user '/projects/my-likes'

@project_routes.route('/my-likes')
@login_required
def my_likes():
    likes = Like.query.filter(current_user.id == Like.userId).all()
    if likes:
        return {"my_likes": [like.to_dict() for like in likes]}
    else:
        return jsonify({"error": "Likes could not be found for the current user"}), 404
