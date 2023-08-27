from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
# from datetime import datetime
# from .user import User
from .db import db, environment, SCHEMA, add_prefix_for_prod
# from category import Category


# created_at = db.Column(db.DateTime, default=func.now())
# updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

# db = SQLAlchemy()

class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    categoryId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), nullable=False)
    bannerImg = db.Column(db.String, nullable=False)
    endDate = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now(), onupdate=func.now())

    # EXTERNAL-MODEL RELATIONSHIPS(FOREIGN-KEYS):
    # Relates to ownerId
    user = db.relationship('User', back_populates='project')
    # relates to categoryId
    category = db.relationship('Category', back_populates='project')

    # INTERNAL-MODEL RELATIONS(PRIMARY-KEY):
    reward = db.relationship('Reward', back_populates='project')
    image = db.relationship('Image', back_populates='project')
    backed_project = db.relationship('BackedProject', back_populates='project')

    