from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
from datetime import datetime
from user import User
from .db import db


class Image(db.Model):
    __tablename__ = 'images'
    id = db.Column(db.Column(db.Integer, primary_key=True, autoincrement=True))
    url = db.Column(db.String, nullable=False)
    imageableId = db.Column(db.Integer, nullable=False)
    imageableType = db.Column(db.String, nullable=False)
    


    # EXTERNAL-MODEL RELATIONSHIPS(FOREIGN-KEYS):
    #   Relates to projectId
    project = db.Column('Project', back_populates='image')