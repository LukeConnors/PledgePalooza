from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField
from app.api.helper_aws import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired

class ImageForm(FlaskForm):
    url = StringField("Url", validators=[DataRequired()])
    submit = SubmitField("Submit")
