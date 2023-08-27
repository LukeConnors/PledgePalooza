from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func


from .db import db, environment, SCHEMA

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Column(db.Integer, primary_key=True, autoincrement=True))
    url = db.Column(db.String, nullable=False)
    imageableId = db.Column(db.Integer, nullable=False)
    imageableType = db.Column(db.String, nullable=False)
    


    # EXTERNAL-MODEL RELATIONSHIPS(FOREIGN-KEYS):
    #   Relates to projectId
    project = db.relationship('Project', back_populates='image')
    reward = db.relationship('Reward', back_populates='image')