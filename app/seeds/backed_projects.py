from app.models import db, User, Project, Category, Reward, BackedProject, environment, SCHEMA
from sqlalchemy.sql import text


def seed_backed_projects():
    backedProject1 =  BackedProject(
        projectId=1,
        rewardId=1,
        userId=2,
        amount=50
    )

    backedProject2 = BackedProject(
        projectId=3,
        rewardId=9,
        userId=2,
        amount=55
    )

    backedProject3 = BackedProject(
        projectId=2,
        rewardId=5,
        userId=1,
        amount=60
    )

    backedProject4 = BackedProject(
        projectId=5,
        rewardId=14,
        userId=1,
        amount=45
    )

    backedProject5 = BackedProject(
        projectId=4,
        rewardId=61,
        userId=3,
        amount=30
    )

    backedProject6 = BackedProject(
        projectId=5,
        rewardId=13,
        userId=3,
        amount=20
    )

    backedProject7 = BackedProject(
        projectId=7,
        rewardId=23,
        userId=4,
        amount=80
    )

    backedProject8 = BackedProject(
        projectId=9,
        rewardId=29,
        userId=4,
        amount=205
    )

    backedProject9 = BackedProject(
        projectId=11,
        rewardId=40,
        userId=5,
        amount=300
    )

    backedProject10 = BackedProject(
        projectId=13,
        rewardId=45,
        userId=5,
        amount=40
    )

    backedProject11 = BackedProject(
        projectId=15,
        rewardId=54,
        userId=6,
        amount=50
    )

    backedProject12 = BackedProject(
        projectId=16,
        rewardId=59,
        userId=6,
        amount=150
    )

    backedProject13 = BackedProject(
        projectId=5,
        rewardId=15,
        userId=7,
        amount=120
    )

    backedProject14 = BackedProject(
        projectId=8,
        rewardId=25,
        userId=7,
        amount=300
    )

    backedProject15 = BackedProject(
        projectId=14,
        rewardId=49,
        userId=8,
        amount=27
    )

    backedProject16 = BackedProject(
        projectId=12,
        rewardId=43,
        userId=8,
        amount=65
    )

    backedProject17 = BackedProject(
        projectId=10,
        rewardId=36,
        userId=9,
        amount=105
    )

    backedProject18 = BackedProject(
        projectId=13,
        rewardId=46,
        userId=9,
        amount=76
    )

    backedProject19 = BackedProject(
        projectId=6,
        rewardId=17,
        userId=10,
        amount=35
    )
    backedProject20 = BackedProject(
        projectId=13,
        rewardId=46,
        userId=10,
        amount=76
    )

    db.session.add(backedProject1)
    db.session.add(backedProject2)
    db.session.add(backedProject3)
    db.session.add(backedProject4)
    db.session.add(backedProject5)
    db.session.add(backedProject6)
    db.session.add(backedProject7)
    db.session.add(backedProject8)
    db.session.add(backedProject9)
    db.session.add(backedProject10)
    db.session.add(backedProject11)
    db.session.add(backedProject12)
    db.session.add(backedProject13)
    db.session.add(backedProject14)
    db.session.add(backedProject15)
    db.session.add(backedProject16)
    db.session.add(backedProject17)
    db.session.add(backedProject18)
    db.session.add(backedProject19)
    db.session.add(backedProject20)








def undo_backed_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.backed_projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM backed_projects"))

    db.session.commit()
