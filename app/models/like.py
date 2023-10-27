from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func, UniqueConstraint
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'



    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    projectId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')), nullable=False)

    # EXTERNAL-MODEL RELATIONSHIPS(FOREIGN-KEYS):
    project = db.relationship('Project', back_populates='like')
    user = db.relationship('User', back_populates='like')

    if environment == "production":
        __table_args__ = (UniqueConstraint(userId, projectId, name='unique_liked_project'), {'schema': SCHEMA})
    else:
        __table_args__ = (UniqueConstraint(userId, projectId, name='unique_liked_project'),)

    def to_dict(self):
        return {
            'id': self.id,
            "userId": self.userId,
            "projectId": self.projectId
        }
