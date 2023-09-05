from flask import Blueprint, request, jsonify, redirect
from app.models import db, Image, User, Project, Reward, Category, BackedProject
from flask_login import current_user, login_required
from app.api.helper_aws import (
    upload_file_to_s3, get_unique_filename)
from app.forms.image_form import ImageForm
from .helper_aws import upload_file_to_s3
from datetime import date

reward_routes = Blueprint('rewards', __name__)

#  POST an Image to a reward by reward ID '/rewards/:rewardId'
@reward_routes.route('/<int:id>/image', methods=["POST"])
@login_required
def reward_image(id):
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        img = request.files['url']
        if img:
            img_url = upload_file_to_s3(img)
            new_image = Image(
            url = img_url["url"],
            imageable_id = id,
            imageable_type = "reward"
            )
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()
