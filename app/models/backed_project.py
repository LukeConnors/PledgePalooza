from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
from datetime import datetime
from user import User
from .db import db

class BackedProject(db.Model):
    __tablename__ = 'backed_projects'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    projectId = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    rewardId = db.Column(db.Integer, db.ForeignKey('rewards.id'), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    cost = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now(), onupdate=func.now())

    user = db.relationship('User', back_populates='backed_project')
    
