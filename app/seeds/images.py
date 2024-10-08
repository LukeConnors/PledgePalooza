from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    project_image1 = Image(
        url="https://pledgepalooza-images.s3.us-east-2.amazonaws.com/MysticRealms_Pic_2.png",
        imageable_id=1,
        imageable_type="project"
    )

    project_image2 = Image(
        url= "https://pledgepalooza-images.s3.us-east-2.amazonaws.com/Cosmic_Odyssey_pic2.png",
        imageable_id=3,
        imageable_type="project"
    )

    project_image3 = Image(
        url= "https://pledgepalooza-images.s3.us-east-2.amazonaws.com/Arcane_Alchemy_pic2.png",
        imageable_id=4,
        imageable_type="project"
    )
    project_image4 = Image(
        url= "https://pledgepalooza-images.s3.us-east-2.amazonaws.com/DragonsDominion_pic2.png",
        imageable_id=6,
        imageable_type="project"
    )
    project_image5 = Image(
        url= "https://pledgepalooza-images.s3.us-east-2.amazonaws.com/UnderwaterVROydssey_pic2.png",
        imageable_id=7,
        imageable_type="project"
    )
    project_image6 = Image(
        url= "https://pledgepalooza-images.s3.us-east-2.amazonaws.com/QuantumX_pic2.png",
        imageable_id=8,
        imageable_type="project"
    )
    project_image7 = Image(
        url= "https://pledgepalooza-images.s3.us-east-2.amazonaws.com/LunaLens_pic2.png",
        imageable_id=9,
        imageable_type="project"
    )
    project_image8 = Image(
        url= "https://pledgepalooza-images.s3.us-east-2.amazonaws.com/SkyHawk_pic2.png",
        imageable_id=10,
        imageable_type="project"
    )
    project_image9 = Image(
        url= "https://pledgepalooza-images.s3.us-east-2.amazonaws.com/EcoStyle_pic2.png",
        imageable_id=12,
        imageable_type="project"
    )
    project_image10 = Image(
        url= "https://pledgepalooza-images.s3.us-east-2.amazonaws.com/UrbanThreads_pic2.png",
        imageable_id=13,
        imageable_type="project"
    )
    project_image11 = Image(
        url= "https://pledgepalooza-images.s3.us-east-2.amazonaws.com/EpicTales_pic2.png",
        imageable_id=14,
        imageable_type="project"
    )
    project_image12 = Image(
        url= "https://pledgepalooza-images.s3.us-east-2.amazonaws.com/EpicTales_pic1.png",
        imageable_id=14,
        imageable_type="project"
    )
    project_image13 = Image(
        url= "https://pledgepalooza-images.s3.us-east-2.amazonaws.com/CookbookChronicles_pic2.png",
        imageable_id=15,
        imageable_type="project"
    )
    project_image14 = Image(
        url= "https://pledgepalooza-images.s3.us-east-2.amazonaws.com/Whodunit_Mysteries_pic2.png",
        imageable_id=16,
        imageable_type="project"
    )

    project_image15 = Image(
        url= "https://pledgepalooza-images.s3.us-east-2.amazonaws.com/Cybernetica_pic2.png",
        imageable_id=5,
        imageable_type="project"
    )

    project_image16 = Image(
        url= "https://pledgepalooza-images.s3.us-east-2.amazonaws.com/EcoCharge_pic2.png",
        imageable_id=11,
        imageable_type="project"
    )

    reward_image1 = Image(
        url="https://pledgepalooza-images.s3.us-east-2.amazonaws.com/Mystic-Realms-Early-Bird-Special.png",
        imageable_id=1,
        imageable_type="reward"
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
    db.session.add(reward_image1)


    db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
