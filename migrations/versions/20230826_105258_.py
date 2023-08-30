"""empty message

Revision ID: 7ae3d1edb391
Revises: ffdc0a98111c
Create Date: 2023-08-26 10:52:58.514269

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '7ae3d1edb391'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None



def upgrade():
    op.create_table('categories',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False, primary_key=True),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )

    op.create_table('projects',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False, primary_key=True),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('location', sa.String(), nullable=False),
    sa.Column('ownerId', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
    sa.Column('categoryId', sa.Integer(), sa.ForeignKey('categories.id'), nullable=False),
    sa.Column('bannerImg', sa.String(), nullable=False),
    sa.Column('endDate', sa.Date(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )


    op.create_table('images',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False, primary_key=True),
    sa.Column('url', sa.String(), nullable=False),
    sa.Column('imageable_id', sa.Integer(), nullable=False),
    sa.Column('imageable_type', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )

    op.create_table('rewards',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False, primary_key=True),
    sa.Column('projectId', sa.Integer(), sa.ForeignKey('projects.id'), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('est_deliv', sa.Date(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )

    op.create_table('backed_projects',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False, primary_key=True),
    sa.Column('projectId', sa.Integer(), sa.ForeignKey('projects.id'), nullable=False),
    sa.Column('rewardId', sa.Integer(), sa.ForeignKey('rewards.id'), nullable=False),
    sa.Column('userId', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
    sa.Column('cost', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )



    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('categories')
    op.drop_table('projects')
    op.drop_table('images')
    op.drop_table('rewards')
    op.drop_table('backed_projects')
