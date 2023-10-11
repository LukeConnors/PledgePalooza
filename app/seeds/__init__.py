from flask.cli import AppGroup
from .users import seed_users, undo_users
from .backed_projects import seed_backed_projects, undo_backed_projects
from .projects import seed_projects, undo_projects
from .categories import seed_categories, undo_categories
from .images import seed_images, undo_images
from .rewards import seed_rewards, undo_rewards
from .likes import seed_likes, undo_likes

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_categories()
        undo_projects()
        undo_rewards()
        undo_images()
        undo_backed_projects()
        undo_likes()
    seed_users()
    seed_categories()
    seed_projects()
    seed_rewards()
    seed_images()
    seed_backed_projects()
    seed_likes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_categories()
    undo_projects()
    undo_rewards()
    undo_images()
    undo_backed_projects()
    undo_likes()
    # Add other undo functions here
