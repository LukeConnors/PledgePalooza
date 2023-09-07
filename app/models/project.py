from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func

from .db import db, environment, SCHEMA, add_prefix_for_prod


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
    summary =db.Column(db.String, nullable=False)
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
    reward = db.relationship('Reward', back_populates='project', cascade="all, delete-orphan" )
    image = db.relationship('Image', primaryjoin="and_(Image.imageable_type=='project', foreign(Image.imageable_id)==Project.id)", cascade="all, delete-orphan")
    backed_project = db.relationship('BackedProject',back_populates='project', cascade="all, delete-orphan" )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            "bannerImg": self.bannerImg,
            "ownerId": self.ownerId,
            "ownerName" : self.user.username,
            "category": self.category.name,
            "endDate": self.endDate,
            "location": self.location,
            "summary": self.summary,
        }
