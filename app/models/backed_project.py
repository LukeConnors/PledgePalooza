from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
from .db import db, environment, SCHEMA, add_prefix_for_prod

class BackedProject(db.Model):
    __tablename__ = 'backed_projects'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    projectId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')), nullable=False)
    rewardId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('rewards.id')), nullable=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    cost = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now(), onupdate=func.now())

    user = db.relationship('User', back_populates='backed_project')
    project = db.relationship('Project', back_populates='backed_project')
    reward = db.relationship('Reward', back_populates='backed_project')

    def test():
        pass


    def to_dict(self):
        return {
            "id": self.id,
            "projectId": self.projectId,
            "rewardId": self.rewardId,
            "userId": self.userId,
            "cost": self.cost
        }
