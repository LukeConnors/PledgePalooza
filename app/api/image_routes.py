from flask import Blueprint, request, jsonify, redirect
from app.models import db, Image
from flask_login import login_required


image_routes = Blueprint('images', __name__)


# GET all Images
@image_routes.route('/')
def all_images():
    images = Image.query.all()
    return {"image": [image.to_dict() for image in images]}

