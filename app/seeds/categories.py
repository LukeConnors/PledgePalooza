from app.models import db, User, Project, Category, environment, SCHEMA
from sqlalchemy.sql import text


def seed_categories():
    category1 = Category(
        name="Board Game"
    )

    category2 = Category(
        name="Video Game"
    )

    category3 = Category(
        name="Technology"
    )

    category4 = Category(
        name="Retail"
    )

    category5 = Category(
        name="Cooking"
    )


    db.session.add(category1)
    db.session.add(category2)
    db.session.add(category3)
    db.session.add(category4)
    db.session.add(category5)

    db.session.commit()


def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
