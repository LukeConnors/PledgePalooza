from app.models import db, User, Project, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


def seed_projects():
    project1 = Project(
        name='Mystic Realms: Legends of Enchantoria',
        description='Embark on a mystical journey in this enchanting board game. Dive into the lore, meet magical creatures, and unravel the secrets of Enchantoria!',
        location='Enchantoria Games, San Francisco, USA',
        ownerId=1,  # Replace with the actual user ID
        categoryId=1,  # Replace with the actual category ID for board games
        bannerImg='https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/MysticRealm1.png',
        endDate=date(2023, 12, 31),
    )

    project2 = Project(
        name='Virtual Oasis: The VR Adventure',
        description='Immerse yourself in a virtual oasis in this cutting-edge VR RPG. Explore lush landscapes, conquer mythical beasts, and unlock the secrets of the Oasis!',
        location='Oasis Studios, Los Angeles, USA',
        ownerId=2,  # Replace with the actual user ID
        categoryId=2,  # Replace with the actual category ID for video games
        bannerImg='https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/VRheadset.png',
        endDate=date(2024, 6, 30),
    )

    project3 = Project(
        name='Cosmic Odyssey: The Intergalactic Board Game',
        description='Embark on an epic cosmic adventure in this sci-fi board game. Command starfleets, navigate wormholes, and explore the uncharted territories of the galaxy!',
        location='Galaxy Games, Seattle, USA',
        ownerId=3,  # Replace with the actual user ID
        categoryId=1,  # Replace with the actual category ID for board games
        bannerImg='https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/Cosmic1.png',
        endDate=date(2023, 8, 15),
    )

    project4 = Project(
        name='Arcane Alchemy: The Magical Card Game',
        description='Master the art of arcane alchemy in this enchanting card game. Brew magical concoctions, summon mystical creatures, and compete in the world of spellcraft!',
        location='Mystic Games, Edinburgh, UK',
        ownerId=4,  # Replace with the actual user ID
        categoryId=1,  # Replace with the actual category ID for board games
        bannerImg='https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/Arcane1.png',
        endDate=date(2023, 10, 31),
    )

    project5 = Project(
        name='Cybernetica: The Futuristic VR Adventure',
        description='Dive into the futuristic world of Cybernetica in this mind-bending VR adventure. Hack cyberspace, battle cybernetic foes, and rewrite the future!',
        location='Cyber Nexus, Tokyo, Japan',
        ownerId=5,  # Replace with the actual user ID
        categoryId=2,  # Replace with the actual category ID for video games
        bannerImg='https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/Cybernetica1.png',
        endDate=date(2024, 5, 15),
    )

    project6 = Project(
        name='Dragons Dominion: The Legendary Board Game',
        description='Enter Dragons Dominion, a legendary realm in this epic board game. Tame dragons, explore ancient ruins, and become a legend in a land of fantasy!',
        location='Dragonfire Studios, Dublin, Ireland',
        ownerId=6,  # Replace with the actual user ID
        categoryId=1,  # Replace with the actual category ID for board games
        bannerImg='https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/DragonsDomain.png',
        endDate=date(2023, 9-30),
    )
    project7 = Project(
        name='AquaVenture: The Underwater VR Odyssey',
        description='Embark on an underwater odyssey in AquaVenture, the immersive VR experience. Dive into vibrant coral reefs, encounter marine marvels, and uncover lost treasures!',
        location='DeepSea Studios, Sydney, Australia',
        ownerId=7,  # Replace with the actual user ID
        categoryId=2,  # Replace with the actual category ID for video games
        bannerImg='https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/aquaventure.png',
        endDate=date(2024, 4, 20),
    )

    project8 = Project(
        name='QuantumX: The Quantum Computing Breakthrough',
        description='Unlock the power of quantum computing with QuantumX. Solve complex problems faster, revolutionize cryptography, and explore the limitless potential of quantum technology!',
        location='Quantum Labs, Silicon Valley, USA',
        ownerId=8,  # Replace with the actual user ID
        categoryId=3,  # Replace with the actual category ID for tech products
        bannerImg='https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/quantumx1.png',
        endDate=date(2024, 2, 28),
    )

    project9 = Project(
        name='LunaLens: The Augmented Reality Glasses',
        description='Step into augmented reality with LunaLens. Overlay digital information on your world, play immersive AR games, and redefine how you see the future!',
        location='LunaTech, New York City, USA',
        ownerId=9,  # Replace with the actual user ID
        categoryId=2,  # Replace with the actual category ID for tech products
        bannerImg='https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/lunalens1.png',
        endDate=date(2024, 3, 15),
    )

    project10 = Project(
        name='SkyHawk: The AI-Powered Drone',
        description='Experience the future of flight with SkyHawk, the AI-powered drone. Capture breathtaking aerial footage, enjoy autonomous flights, and redefine your perspective!',
        location='SkyTech Innovations, Los Angeles, USA',
        ownerId=10,  # Replace with the actual user ID
        categoryId=3,  # Replace with the actual category ID for tech products
        bannerImg='https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/skyhawk.png',
        endDate=date(2024, 4, 10),
    )
    project11 = Project(
        name='EcoCharge: The Solar-Powered Charger',
        description='Stay charged sustainably with EcoCharge, the solar-powered charger. Harness the suns energy, charge your devices anywhere, and reduce your carbon footprint!',
        location='EcoTech Solutions, Amsterdam, Netherlands',
        ownerId=6,  # Replace with the actual user ID
        categoryId=3,  # Replace with the actual category ID for tech products
        bannerImg='https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/ecocharge1.png',
        endDate=date(2024, 5, 5),
    )
    project12 = Project(
        name='EcoStyle: Sustainable Fashion Line',
        description='Introducing EcoStyle, a sustainable fashion line made from eco-friendly materials. Embrace conscious fashion, reduce your environmental footprint, and look stylish!',
        location='EcoChic Studios, Paris, France',
        ownerId=5,  # Replace with the actual user ID
        categoryId=4,  # Replace with the actual category ID for fashion
        bannerImg='https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/ecostyle1.png',
        endDate=date(2024, 6, 30),
    )

    project13 = Project(
        name='UrbanThreads: Streetwear Reimagined',
        description='Explore the urban culture with UrbanThreads. Elevate your street style with unique designs, quality materials, and the essence of the city streets!',
        location='UrbanX Apparel, New York City, USA',
        ownerId=4,  # Replace with the actual user ID
        categoryId=4,  # Replace with the actual category ID for fashion
        bannerImg='https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/urbanthreads.png',
        endDate='2024-07-15',
    )
    project14 = Project(
        name='Epic Tales: Fantasy Novel Series',
        description='Embark on a journey through epic fantasy worlds with the "Epic Tales" series. Join mythical heroes, face ancient evils, and get lost in the magic of storytelling!',
        location='MysticWords Publishing, London, UK',
        ownerId=3,  # Replace with the actual user ID
        categoryId=1,  # Replace with the actual category ID for books
        bannerImg='https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/epictales.png',
        endDate=date(2024, 10, 20),
    )

    project15 = Project(
        name='Cookbook Chronicles: Culinary Adventure',
        description='Indulge your taste buds with "Cookbook Chronicles." Explore diverse cuisines, savor delicious recipes, and embark on a culinary adventure!',
        location='Culinary Creations, New Orleans, USA',
        ownerId=2,  # Replace with the actual user ID
        categoryId=5,  # Replace with the actual category ID for books
        bannerImg='https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/cookbook1.png',
        endDate=date(2024, 11, 10),
    )

    project16 = Project(
        name='Whodunit Mysteries: Detective Series',
        description='Unravel thrilling mysteries with the "Whodunit Mysteries" series. Put on your detective hat, follow clues, and solve crimes that keep you on the edge of your seat!',
        location='Ink & Intrigue Publishing, New York City, USA',
        ownerId=1,  # Replace with the actual user ID
        categoryId=1,  # Replace with the actual category ID for books
        bannerImg='https://pledgepaloozabucket.s3.us-east-2.amazonaws.com/mystery1.png',
        endDate=date(2024, 12, 5),
    )


    db.session.add(project1)
    db.session.add(project2)
    db.session.add(project3)
    db.session.add(project4)
    db.session.add(project5)
    db.session.add(project6)
    db.session.add(project7)
    db.session.add(project8)
    db.session.add(project9)
    db.session.add(project10)
    db.session.add(project11)
    db.session.add(project12)
    db.session.add(project13)
    db.session.add(project14)
    db.session.add(project15)
    db.session.add(project16)


    db.session.commit()


def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))

    db.session.commit()
