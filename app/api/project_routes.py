from flask import Blueprint, request
from app.models import db, Image, User
from flask_login import current_user, login_required
from app.api.helper_aws import (
    upload_file_to_s3, get_unique_filename)
from app.forms.image_form import ImageForm

# project_routes = Blueprint('users', __name__)

# Routes

def try():
    pass
# !!!!!!!!!!!!! Projects CRUD !!!!!!!!!!!!!!!!!!!

# GET all projects at '/projects'

# POST a project for authenticated user '/projects'

# GET all projects owned by current user '/projects/my-projects'

# GET a project's details '/projects/:id'

# PUT a project's details (authenticated user) '/projects/:id'

# DELETE a project by projectId '/projects/:id'

# POST a banner image to a project (authenticated user) '/projects/:id/banner-image'

# POST description images to a project (authenticated user) '/projects/:id/description-images'


project_routes = Blueprint("projects", __name__)


@project_routes.route("/<int:id>/description-images", methods=["POST"])
@login_required
def upload_description_images():
    form = ImageForm()

    if form.validate_on_submit():

        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return render_template("post_form.html", form=form, errors=[upload])

        url = upload["url"]
        new_image = Post(image= url)
        db.session.add(new_image)
        db.session.commit()
        return redirect("/posts/all")

    if form.errors:
        print(form.errors)
        return render_template("post_form.html", form=form, errors=form.errors)

    return render_template("post_form.html", form=form, errors=None)



# !!!!!!!!!!!!! Rewards CRUD !!!!!!!!!!!!!!!!!!!

# GET rewards by projectId at '/projects/:project-id/rewards-

# POST a reward by projectId at '/projects/:project-id/rewards' (auth user)

# UPDATE a reward by rewardId at '/projects/:project-id/rewards/:reward-id' (auth user)

# DELETE a reward by rewardId at '/projects/:project-id/rewards/:reward-id' (auth user)


# !!!!!!!!!!!!!!! Backed CRU(no D) !!!!!!!!!!!!!!

# POST backed status by projectId at '/projects/:project-id/back' (auth user)

# PUT backed amount by projectId at '/projects/:project-id/back'  (auth user)
