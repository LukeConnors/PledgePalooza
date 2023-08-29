from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    project_image1 = Image(
        url="https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/MysticRealm2.png",
        imageable_id=1,
        imageable_type="project"
    )

    project_image2 = Image(
        url= "https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/Cosmic2.png",
        imageable_id=2,
        imageable_type="project"
    )

    project_image3 = Image(
        url= "https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/Arcane2.png",
        imageable_id=2,
        imageable_type="project"
    )
    project_image4 = Image(
        url= "https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/DragonsDomain2.png",
        imageable_id=2,
        imageable_type="project"
    )
    project_image5 = Image(
        url= "",
        imageable_id=2,
        imageable_type="project"
    )
    project_image6 = Image(
        url= "",
        imageable_id=2,
        imageable_type="project"
    )
    project_image7 = Image(
        url= "",
        imageable_id=2,
        imageable_type="project"
    )
    project_image8 = Image(
        url= "",
        imageable_id=2,
        imageable_type="project"
    )
    project_image9 = Image(
        url= "",
        imageable_id=2,
        imageable_type="project"
    )
    project_image10 = Image(
        url= "",
        imageable_id=2,
        imageable_type="project"
    )
    project_image11 = Image(
        url= "",
        imageable_id=2,
        imageable_type="project"
    )
    project_image12 = Image(
        url= "",
        imageable_id=2,
        imageable_type="project"
    )
    project_image13 = Image(
        url= "",
        imageable_id=2,
        imageable_type="project"
    )
    project_image14 = Image(
        url= "",
        imageable_id=2,
        imageable_type="project"
    )
    project_image15 = Image(
        url= "",
        imageable_id=2,
        imageable_type="project"
    )
    project_image16 = Image(
        url= "",
        imageable_id=2,
        imageable_type="project"
    )
    project_image17 = Image(
        url= "",
        imageable_id=2,
        imageable_type="project"
    )
    project_image18 = Image(
        url= "",
        imageable_id=2,
        imageable_type="project"
    )
    project_image19 = Image(
        url= "",
        imageable_id=2,
        imageable_type="project"
    )










    db.session.add(project_image1)
    db.session.add(project_image2)
    db.session.add(project_image3)
    db.session.add(project_image4)
    db.session.add(project_image5)
    db.session.add(project_image6)
    db.session.add(project_image7)
    db.session.add(project_image8)
    db.session.add(project_image9)
    db.session.add(project_image10)
    db.session.add(project_image11)
    db.session.add(project_image12)
    db.session.add(project_image13)
    db.session.add(project_image14)
    db.session.add(project_image15)
    db.session.add(project_image16)
    db.session.add(project_image17)
    db.session.add(project_image18)
    db.session.add(project_image19)


    db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
