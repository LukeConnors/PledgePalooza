from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, DateField, FileField, SelectField, validators
from wtforms.validators import DataRequired
from app.models import Category, Project

# def category_options():

#     categories = Category.query.all()
#     return [(category.id, category.name) for category in categories]

class RewardForm(FlaskForm):
    # projectId = IntegerField('Project Id', [validators.DataRequired(), validators.Length(max=100)])
    name = StringField('Name', [validators.DataRequired()])
    description = TextAreaField('Description', [validators.DataRequired()])
    price = IntegerField('Price', [validators.DataRequired()])
    est_delivery = DateField('Estimated Delivery', [validators.DataRequired()])
    quantity = IntegerField('Quantity', [validators.DataRequired()])
