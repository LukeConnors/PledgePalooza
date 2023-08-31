from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
from .db import db, environment, SCHEMA

class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)


    # INTERNAL-MODEL RELATIONS(PRIMARY-KEY):
    project = db.relationship('Project', back_populates='category')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
