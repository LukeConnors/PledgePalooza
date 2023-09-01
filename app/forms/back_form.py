from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, IntegerField, DateField, FileField, SelectField, validators
from wtforms.validators import DataRequired
from app.models import Category, Project

class BackForm(FlaskForm):
    cost = IntegerField('Amount', [validators.DataRequired()])
    # submit = SubmitField("Back this project")