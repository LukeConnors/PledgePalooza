from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Reward(db.Model):
    __tablename__ = 'rewards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    projectId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')), nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    est_delivery = db.Column(db.Date, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now(), onupdate=func.now())

    image = db.relationship('Image' , primaryjoin="and_(Image.imageable_type=='reward', foreign(Image.imageable_id)==Reward.id)")
    project = db.relationship('Project', back_populates='reward')
