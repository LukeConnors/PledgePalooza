from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, DateField, FileField, SelectField, validators
from wtforms.validators import DataRequired
from app.models import Category, Project

# def category_options():

#     categories = Category.query.all()
#     return [(category.id, category.name) for category in categories]

class ProjectForm(FlaskForm):
    name = StringField('Name', [validators.DataRequired(), validators.Length(max=100)])
    description = TextAreaField('Description', [validators.DataRequired()])
    location = StringField('Location', [validators.DataRequired()])
    categoryId = SelectField('Category', [validators.DataRequired()], choices=[(1, "Board Game"),(2, "Video Game"),(3, "Technology"),(4, "Retail"), (5, "Cooking")], coerce=int) 
    bannerImg = StringField('Banner Image', [validators.DataRequired()]) 
    endDate = DateField('End Date', [validators.DataRequired()]) 