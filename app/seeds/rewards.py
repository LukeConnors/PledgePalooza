from app.models import db, User, Project, Reward, environment, SCHEMA
from sqlalchemy.sql import text

def seed_rewards():
    reward1 = Reward(
        projectId=1,
        name='Early Bird Special',
        description='Be among the first to get the game at a special price!',
        price=35,
        est_delivery='2024-05-01',
        quantity=100,
    )

    reward2 = Reward(
        projectId=1,
        name='Enchanting Art Print',
        description="Receive a stunning art print inspired by the game's artwork.",
        price=50,
        est_delivery='2024-06-01',
        quantity=50,
    )

    reward3 = Reward(
        projectId=1,
        name="Collector's Edition",
        description="Get the deluxe collector's edition with exclusive content",
        price=75,
        est_delivery='2024-07-01',
        quantity=30,
    )

    reward4 = Reward(
        projectId=1,
        name='Game + Expansion Pack',
        description='Get the base game and the first expansion pack bundled together!',
        price=60,
        est_delivery='2024-08-01',
        quantity=60,
    )

    reward5 = Reward(
        projectId=2,
        name='VR Explorer Pack',
        description='Embark on your VR adventure with this essential starter pack!',

        price=40,
        est_delivery='2024-09-01',
        quantity=100,
    )

    reward6 = Reward(
        projectId=2,
        name='Exclusive In-Game Pet',
        description='Receive an adorable virtual pet companion in the game!',
        price=25,
        est_delivery='2024-09-01',
        quantity=200,
    )

    reward7 = Reward(
        projectId=2,
        name='VIP Access',
        description='Gain VIP status and enjoy early access and special in-game perks!',
        price=75,
        est_delivery='2024-08-15',
        quantity=50,
    )

    reward8 = Reward(
        projectId=2,
        name='Limited Edition Poster',
        description='Decorate your gaming space with a limited edition poster featuring game artwork.',
        price=30,
        est_delivery='2024-09-15',
        quantity=75,
    )

    reward9 = Reward(
        projectId=3,
        name='Explorer Pack',
        description='Start your cosmic journey with this essential explorer pack!',
        price=35,
        est_delivery='2023-10-01',
        quantity=150,
    )

    reward10 = Reward(
        projectId=3,
        name='Limited Edition Game Board',
        description='Get a unique limited edition game board with exclusive artwork.',
        price=50,
        est_delivery='2023-09-15',
        quantity=100,
    )

    reward11 = Reward(
        projectId=3,
        name='Galactic Commander Pack',
        description='Command the galaxy with this deluxe commander pack!',
        price=75,
        est_delivery='2023-09-01',
        quantity=75,
    )

    reward12 = Reward(
        projectId=3,
        name='Custom Alien Species',
        description='Create and name your own alien species featured in the game.',
        price=100,
        est_delivery='2023-08-25',
        quantity=25,
    )

    reward61 = Reward(
        projectId=4,
        name="Starter Spellbook",
        description="Begin your journey into arcane alchemy with this starter spellbook!",
        price=20,
        est_delivery="2023-12-01",
        quantity=200,
    )

    reward62 = Reward(
        projectId=4,
        name="Collector's Edition Card Set",
        description="Own a collector's edition set of magical cards with unique artwork.",
        price=40,
        est_delivery="2023-11-15",
        quantity=100,
    )

    reward63 = Reward(
        projectId=4,
        name="Master Alchemist Kit",
        description="Become a master alchemist with this deluxe kit of rare ingredients and tools.",
        price=70,
        est_delivery="2023-11-01",
        quantity=50,
    )

    reward64 = Reward(
        projectId=4,
        name="Custom Spell Card",
        description="Design your own spell card and add it to the game!",
        price=100,
        est_delivery="2023-10-25",
        quantity=30,
    )

    reward13 = Reward(
        projectId=5,
        name="Beta Tester Access",
        description="Be one of the first to explore the cybernetic world as a beta tester!",
        price=15,
        est_delivery="2024-01-15",
        quantity=300,
    )

    reward14 = Reward(
        projectId=5,
        name="Digital Art Collection",
        description="Receive a collection of stunning digital art inspired by Cybernetica.",
        price=30,
        est_delivery="2023-12-31",
        quantity=100,
    )

    reward15 = Reward(
        projectId=5,
        name="Ultimate Cybernetic Upgrade",
        description="Enhance your VR experience with the ultimate cybernetic hardware upgrade.",
        price=100,
        est_delivery="2023-12-15",
        quantity=50,
    )

    reward16 = Reward(
        projectId=5,
        name="Exclusive In-Game Character",
        description="Unlock an exclusive in-game character with unique abilities!",
        price=50,
        est_delivery="2023-12-01",
        quantity=75,
    )

    reward17 = Reward(
        projectId=6,
        name="Dragon Tamer's Starter Kit",
        description="Begin your journey as a dragon tamer with this essential starter kit!",
        price=20,
        est_delivery="2024-01-15",
        quantity=200,
    )

    reward18 = Reward(
        projectId=6,
        name="Limited Edition Art Book",
        description="Own a limited edition art book featuring stunning illustrations from Dragons Dominion.",
        price=35,
        est_delivery="2023-12-31",
        quantity=100,
    )

    reward19 = Reward(
        projectId=6,
        name="Legendary Dragon Figurine",
        description="Receive an intricately crafted figurine of a legendary dragon from the game.",
        price=75,
        est_delivery="2023-12-15",
        quantity=50,
    )

    reward20 = Reward(
        projectId=6,
        name="Custom Character Illustration",
        description="Get a custom character illustration of yourself as a hero in Dragons Dominion.",
        price=50,
        est_delivery="2023-12-01",
        quantity=75,
    )

    reward21 = Reward(
        projectId=7,
        name="Virtual Dive Certification",
        description="Get certified as a virtual diver and gain access to exclusive in-game content.",
        price=30,
        est_delivery="2024-01-15",
        quantity=150,
    )

    reward22 = Reward(
        projectId=7,
        name="Ocean Explorer's Bundle",
        description="Receive a bundle of ocean-themed VR experiences, including AquaVenture.",
        price=50,
        est_delivery="2023-12-31",
        quantity=100,
    )

    reward23 = Reward(
        projectId=7,
        name="DeepSea Diver's Kit",
        description="Get equipped with a virtual deep-sea diving kit for immersive exploration.",
        price=75,
        est_delivery="2023-12-15",
        quantity=50,
    )

    reward24 = Reward(
        projectId=7,
        name="Underwater Photography Course",
        description="Join a virtual underwater photography course and capture stunning aquatic moments.",
        price=40,
        est_delivery="2023-12-01",
        quantity=75,
    )

    reward25 = Reward(
        projectId=8,
        name="QuantumX Developer Kit",
        description="Get your hands on the QuantumX developer kit and start experimenting with quantum computing.",
        price=250,
        est_delivery="2024-01-15",
        quantity=50,
    )

    reward26 = Reward(
        projectId=8,
        name="QuantumX Quantum Simulator",
        description="Receive access to the QuantumX quantum simulator for virtual quantum experiments.",
        price=100,
        est_delivery="2024-01-31",
        quantity=100,
    )

    reward27 = Reward(
        projectId=8,
        name="QuantumX Masterclass",
        description="Join a virtual masterclass on quantum computing with leading experts in the field.",
        price=150,
        est_delivery="2024-02-15",
        quantity=30,
    )

    reward28 = Reward(
        projectId=8,
        name="QuantumX Research Grant",
        description="Receive a research grant to support your quantum computing research project.",
        price=500,
        est_delivery="2024-03-31",
        quantity=10,
    )

    reward29 = Reward(
        projectId=9,
        name="LunaLens Basic Kit",
        description="Get the LunaLens Basic Kit and start experiencing augmented reality in a whole new way.",
        price=199,
        est_delivery="2024-02-28",
        quantity=100,
    )

    reward30 = Reward(
        projectId=9,
        name="LunaLens Pro Edition",
        description="Upgrade to the LunaLens Pro Edition for advanced AR capabilities and exclusive content.",
        price=299,
        est_delivery="2024-03-15",
        quantity=50,
    )

    reward31 = Reward(
        projectId=9,
        name="LunaLens Developer Kit",
        description="Receive the LunaLens Developer Kit for creating your own augmented reality experiences.",
        price=499,
        est_delivery="2024-04-01",
        quantity=30,
    )

    reward32 = Reward(
        projectId=9,
        name="LunaLens Exclusive Access",
        description="Get exclusive early access to LunaLens updates and features.",
        price=99,
        est_delivery="2024-03-31",
        quantity=200,
    )

    reward33 = Reward(
        projectId=10,
        name="SkyHawk Explorer Pack",
        description="Get the SkyHawk Explorer Pack and start your aerial adventures with our AI-powered drone.",
        price=499,
        est_delivery="2024-03-15",
        quantity=100,
    )

    reward34 = Reward(
        projectId=10,
        name="SkyHawk Pro Pack",
        description="Upgrade to the SkyHawk Pro Pack for advanced features and extended flight time.",
        price=799,
        est_delivery="2024-03-31",
        quantity=50,
    )

    reward35 = Reward(
        projectId=10,
        name="SkyHawk Autonomous Flight Kit",
        description="Receive the SkyHawk Autonomous Flight Kit to experience fully autonomous drone flights.",
        price=1199,
        est_delivery="2024-04-15",
        quantity=30,
    )

    reward36 = Reward(
        projectId=10,
        name="SkyHawk Exclusive Access",
        description="Get exclusive early access to SkyHawk software updates and new features.",
        price=99,
        est_delivery="2024-04-05",
        quantity=200,
    )

    reward37 = Reward(
        projectId=11,
        name="EcoCharge Essential Pack",
        description="Get the EcoCharge Essential Pack and start charging your devices sustainably with our solar-powered charger.",
        price=79,
        est_delivery="2024-04-15",
        quantity=100,
    )

    reward38 = Reward(
        projectId=11,
        name="EcoCharge Ultimate Pack",
        description="Upgrade to the EcoCharge Ultimate Pack for additional solar panels and faster charging.",
        price=129,
        est_delivery="2024-04-30",
        quantity=50,
    )

    reward39 = Reward(
        projectId=11,
        name="EcoCharge Solar Backpack",
        description="Receive the EcoCharge Solar Backpack, a backpack with built-in solar panels to charge your devices on the go.",
        price=149,
        est_delivery="2024-05-15",
        quantity=30,
    )

    reward40 = Reward(
        projectId=11,
        name="EcoCharge Eco-Warrior Bundle",
        description="Become an eco-warrior with this bundle, including multiple EcoCharge sets and a tree planted in your name.",
        price=299,
        est_delivery="2024-05-05",
        quantity=20,
    )

    reward41 = Reward(
        projectId=12,
        name="EcoStyle Essential Collection",
        description="Get the EcoStyle Essential Collection, featuring eco-friendly clothing items made from sustainable materials.",
        price=99,
        est_delivery="2024-07-15",
        quantity=100,
    )

    reward42 = Reward(
        projectId=12,
        name="EcoStyle Premium Collection",
        description="Upgrade to the EcoStyle Premium Collection, with exclusive, high-quality eco-friendly fashion pieces.",
        price=149,
        est_delivery="2024-07-30",
        quantity=50,
    )

    reward43 = Reward(
        projectId=12,
        name="EcoStyle Sustainable Accessories",
        description="Accessorize sustainably with our EcoStyle Sustainable Accessories, including bags, hats, and more.",
        price=49,
        est_delivery="2024-08-15",
        quantity=30,
    )

    reward44 = Reward(
        projectId=12,
        name="EcoStyle Eco-Chic Wardrobe",
        description="Revamp your wardrobe sustainably with the EcoStyle Eco-Chic Wardrobe, a complete collection of eco-friendly fashion.",
        price=249,
        est_delivery="2024-08-05",
        quantity=20,
    )

    reward45 = Reward(
        projectId=13,
        name="UrbanThreads Classic Tee",
        description="Get the UrbanThreads Classic Tee, a comfortable and stylish addition to your streetwear collection.",
        price=39,
        est_delivery="2024-08-01",
        quantity=100,
    )

    reward46 = Reward(
        projectId=13,
        name="UrbanThreads Hoodie",
        description="Upgrade your street style with the UrbanThreads Hoodie, a cozy and fashionable choice for any season.",
        price=69,
        est_delivery="2024-08-15",
        quantity=75,
    )

    reward47 = Reward(
        projectId=13,
        name="UrbanThreads Exclusive Caps",
        description="Complete your streetwear look with UrbanThreads Exclusive Caps, available in various urban-inspired designs.",
        price=29,
        est_delivery="2024-08-10",
        quantity=50,
    )

    reward48 = Reward(
        projectId=13,
        name="UrbanThreads Streetwear Bundle",
        description="Upgrade your entire wardrobe with the UrbanThreads Streetwear Bundle, featuring a range of streetwear essentials.",
        price=149,
        est_delivery="2024-08-20",
        quantity=30,
    )

    reward49 = Reward(
        projectId=14,
        name="Epic Tales: Book 1 - The Quest Begins",
        description="Get the first book in the 'Epic Tales' series and start your journey into the world of epic fantasy.",
        price=19,
        est_delivery="2024-11-01",
        quantity=200,
    )

    reward50 = Reward(
        projectId=14,
        name="Epic Tales: Collector's Edition Set",
        description="Collect all books in the 'Epic Tales' series with this special collector's edition set. Dive deep into the fantasy realms.",
        price=99,
        est_delivery="2024-11-15",
        quantity=100,
    )

    reward51 = Reward(
        projectId=14,
        name="Epic Tales: Exclusive Art Prints",
        description="Decorate your walls with exclusive art prints inspired by 'Epic Tales' and bring the fantasy world to life.",
        price=29,
        est_delivery="2024-11-10",
        quantity=150,
    )

    reward52 = Reward(
        projectId=14,
        name="Epic Tales: Author's Q&A Session",
        description="Join an exclusive live Q&A session with the author of 'Epic Tales' and dive deeper into the creative process.",
        price=49,
        est_delivery="2024-11-20",
        quantity=50,
    )

    reward53 = Reward(
        projectId=15,
        name="Cookbook Chronicles: Digital Edition",
        description="Get a digital copy of 'Cookbook Chronicles' and explore culinary delights from around the world.",
        price=12,
        est_delivery="2024-11-15",
        quantity=500,
    )

    reward54 = Reward(
        projectId=15,
        name="Cookbook Chronicles: Hardcover Collector's Edition",
        description="Own a collector's edition hardcover of 'Cookbook Chronicles' filled with mouthwatering recipes and beautiful illustrations.",
        price=49,
        est_delivery="2024-11-20",
        quantity=300,
    )

    reward55 = Reward(
        projectId=15,
        name="Cookbook Chronicles: Exclusive Cooking Class",
        description="Join an exclusive online cooking class hosted by renowned chefs featured in the book and learn culinary secrets.",
        price=89,
        est_delivery="2024-11-25",
        quantity=100,
    )

    reward56 = Reward(
        projectId=15,
        name="Cookbook Chronicles: Signed Copy + Personal Recipe",
        description="Receive a signed copy of 'Cookbook Chronicles' along with a personalized recipe card from the author.",
        price=29,
        est_delivery="2024-11-18",
        quantity=200,
    )

    reward57 = Reward(
        projectId=16,
        name="Whodunit Mysteries: Digital Collection",
        description="Get a digital collection of the entire 'Whodunit Mysteries' series and dive into a world of suspense and intrigue.",
        price=20,
        est_delivery="2024-12-10",
        quantity=500,
    )

    reward58 = Reward(
        projectId=16,
        name="Whodunit Mysteries: Exclusive Collector's Set",
        description="Own an exclusive collector's set of the 'Whodunit Mysteries' series, including hardcovers, posters, and more.",
        price=99,
        est_delivery="2024-12-15",
        quantity=300,
    )

    reward59 = Reward(
        projectId=16,
        name="Whodunit Mysteries: Personalized Detective Kit",
        description="Receive a personalized detective kit with clues, props, and puzzles to immerse yourself in the world of mysteries.",
        price=149,
        est_delivery="2024-12-18",
        quantity=100,
    )

    reward60 = Reward(
        projectId=16,
        name="Whodunit Mysteries: Virtual Author Q&A",
        description="Join a virtual Q&A session with the author of 'Whodunit Mysteries' and ask questions about the series.",
        price=29,
        est_delivery="2024-12-12",
        quantity=200,
    )

# PROJECT 1
    db.session.add(reward1)
    db.session.add(reward2)
    db.session.add(reward3)
    db.session.add(reward4)
# PROJECT 2
    db.session.add(reward5)
    db.session.add(reward6)
    db.session.add(reward7)
    db.session.add(reward8)
# PROJECT 3
    db.session.add(reward9)
    db.session.add(reward10)
    db.session.add(reward11)
    db.session.add(reward12)
# PROJECT 5
    db.session.add(reward13)
    db.session.add(reward14)
    db.session.add(reward15)
    db.session.add(reward16)
# PROJECT 6
    db.session.add(reward17)
    db.session.add(reward18)
    db.session.add(reward19)
    db.session.add(reward20)
# PROJECT 7
    db.session.add(reward21)
    db.session.add(reward22)
    db.session.add(reward23)
    db.session.add(reward24)
#  PROJECT 8
    db.session.add(reward25)
    db.session.add(reward26)
    db.session.add(reward27)
    db.session.add(reward28)
# PROJECT 9
    db.session.add(reward29)
    db.session.add(reward30)
    db.session.add(reward31)
    db.session.add(reward32)
# PROJECT 10
    db.session.add(reward33)
    db.session.add(reward34)
    db.session.add(reward35)
    db.session.add(reward36)
# PROJECT 11
    db.session.add(reward37)
    db.session.add(reward38)
    db.session.add(reward39)
    db.session.add(reward40)
# PROJECT 12
    db.session.add(reward41)
    db.session.add(reward42)
    db.session.add(reward43)
    db.session.add(reward44)
# PROJECT 13
    db.session.add(reward45)
    db.session.add(reward46)
    db.session.add(reward47)
    db.session.add(reward48)
# PROJECT 14
    db.session.add(reward49)
    db.session.add(reward50)
    db.session.add(reward51)
    db.session.add(reward52)
# PROJECT 15
    db.session.add(reward53)
    db.session.add(reward54)
    db.session.add(reward55)
    db.session.add(reward56)
# PROJECT 16
    db.session.add(reward57)
    db.session.add(reward58)
    db.session.add(reward59)
    db.session.add(reward60)
# PROJECT 4
    db.session.add(reward61)
    db.session.add(reward62)
    db.session.add(reward63)
    db.session.add(reward64)

    def undo_rewards():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.rewards RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM rewards"))


    db.session.commit()
