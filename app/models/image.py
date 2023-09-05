from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func


from .db import db, environment, SCHEMA

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    url = db.Column(db.String, nullable=False)
    imageable_id = db.Column(db.Integer, nullable=False)
    imageable_type = db.Column(db.String, nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'imageable_id': self.imageable_id,
            'imageable_type': self.imageable_type
        }


    # EXTERNAL-MODEL RELATIONSHIPS(FOREIGN-KEYS):
    #   Relates to projectId
    project = db.relationship('Project', back_populates='image', primaryjoin="and_(Image.imageable_type=='project', foreign(Image.imageable_id)==Project.id)", uselist=False)
    reward = db.relationship('Reward', back_populates='image', primaryjoin="and_(Image.imageable_type=='reward', foreign(Image.imageable_id)==Reward.id)", uselist=False)
