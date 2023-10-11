from app.models import db, Project, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    like1 = Like(userId=2, projectId=1)
    like2 = Like(userId=3, projectId=1)
    like3 = Like(userId=4, projectId=1)
    like4 = Like(userId=5, projectId=1)
    like5 = Like(userId=6, projectId=2)
    like6 = Like(userId=7, projectId=2)
    like7 = Like(userId=8, projectId=2)
    like8 = Like(userId=9, projectId=2)
    like9 = Like(userId=10, projectId=2)
    like10 = Like(userId=1, projectId=3)
    like11 = Like(userId=4, projectId=3)
    like12 = Like(userId=5, projectId=3)
    like13 = Like(userId=6, projectId=3)
    like14 = Like(userId=7, projectId=3)
    like15 = Like(userId=8, projectId=4)
    like16 = Like(userId=9, projectId=4)
    like17 = Like(userId=10, projectId=4)
    like18 = Like(userId=1, projectId=4)
    like19 = Like(userId=2, projectId=4)
    like20 = Like(userId=3, projectId=5)
    like21 = Like(userId=6, projectId=5)
    like22 = Like(userId=7, projectId=5)
    like23 = Like(userId=8, projectId=5)
    like24 = Like(userId=9, projectId=5)
    like25 = Like(userId=10, projectId=5)
    like26 = Like(userId=1, projectId=6)
    like27 = Like(userId=2, projectId=6)
    like28 = Like(userId=3, projectId=6)
    like29 = Like(userId=4, projectId=7)
    like30 = Like(userId=5, projectId=7)
    like31 = Like(userId=6, projectId=7)
    like32 = Like(userId=7, projectId=8)
    like33 = Like(userId=8, projectId=8)
    like34 = Like(userId=9, projectId=8)
    like35 = Like(userId=10, projectId=8)
    like36 = Like(userId=1, projectId=9)
    like37 = Like(userId=2, projectId=9)
    like38 = Like(userId=3, projectId=10)
    like39 = Like(userId=4, projectId=10)
    like40 = Like(userId=5, projectId=10)


    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)

    db.session.add(like5)
    db.session.add(like6)
    db.session.add(like7)
    db.session.add(like8)

    db.session.add(like9)
    db.session.add(like10)
    db.session.add(like11)
    db.session.add(like12)

    db.session.add(like13)
    db.session.add(like14)
    db.session.add(like15)
    db.session.add(like16)

    db.session.add(like17)
    db.session.add(like18)
    db.session.add(like19)
    db.session.add(like20)

    db.session.add(like21)
    db.session.add(like22)
    db.session.add(like23)
    db.session.add(like24)

    db.session.add(like25)
    db.session.add(like26)
    db.session.add(like27)
    db.session.add(like28)

    db.session.add(like29)
    db.session.add(like30)
    db.session.add(like31)
    db.session.add(like32)
    db.session.add(like33)
    db.session.add(like34)
    db.session.add(like35)
    db.session.add(like36)

    db.session.add(like37)
    db.session.add(like38)
    db.session.add(like39)
    db.session.add(like40)

    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()