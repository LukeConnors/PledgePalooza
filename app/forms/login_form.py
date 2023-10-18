from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def user_exists(form, field):

    email = field.data
    user = User.query.filter_by(email=email).first()
    if not user:
        raise ValidationError('Email provided not found.')

def password_matches(form, field):

    password = field.data
    email = form.email.data

    user = User.query.filter_by(email=email).first()

    if user and not user.check_password(password):
        raise ValidationError('Password was incorrect.')

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), user_exists])
    password = StringField('Password', validators=[DataRequired(), password_matches])
