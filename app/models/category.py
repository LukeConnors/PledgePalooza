from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
from datetime import datetime
from user import User
from .db import db

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)

    
    # INTERNAL-MODEL RELATIONS(PRIMARY-KEY):
    project = db.relationship('Project', back_populates='category')

    