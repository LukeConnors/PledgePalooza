from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie  = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    tristan = User(
        username='tristan', email='tristan@aa.io', password='password')
    johnny = User(
        username='johnny', email='johnny@aa.io', password='password')
    jacob = User(
        username='jacob', email='jacob567@aa.io', password='password')
    albert = User(
        username='albert', email='albert@aa.io', password='password')
    kurt = User(
        username='kurt', email='kurt@aa.io', password='password')
    luke = User(
        username='luke', email='luke@aa.io', password='password')
    jason = User(
        username='jason', email='jason@aa.io', password='password')


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(tristan)
    db.session.add(johnny)
    db.session.add(jacob)
    db.session.add(albert)
    db.session.add(kurt)
    db.session.add(luke)
    db.session.add(jason)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
