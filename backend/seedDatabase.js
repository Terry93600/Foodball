require('dotenv').config();
const mongoose = require('mongoose');
const argon2 = require('argon2');

// Import des modèles
const Role = require('./models/Role');
const Utilisateur = require('./models/Utilisateur');
const Team = require('./models/Team');
const TypeEvent = require('./models/TypeEvent');
const Event = require('./models/Event');
const Restaurant = require('./models/Restaurant');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connecté pour le seeding');
    } catch (error) {
        console.error('Erreur de connexion:', error);
        process.exit(1);
    }
};

const seedDatabase = async () => {
    try {
        // Vider la base de données
        await Role.deleteMany({});
        await Utilisateur.deleteMany({});
        await Team.deleteMany({});
        await TypeEvent.deleteMany({});
        await Event.deleteMany({});
        await Restaurant.deleteMany({});

        console.log('Base de données vidée');

        // 1. Insérer les rôles
        const roles = await Role.insertMany([
            { nom: 'admin' },
            { nom: 'restaurateur' }
        ]);
        console.log('Rôles créés:', roles.length);

        // 2. Insérer les équipes
        const teams = await Team.insertMany([
            { nom: 'PSG', logo: 'psg.jpg' },
            { nom: 'Bayern Munich', logo: 'bayern-munich.jpg' },
            { nom: 'Real Madrid', logo: 'real-madrid.jpg' },
            { nom: 'FC Barcelona', logo: 'barcelona.jpg' },
            { nom: 'Liverpool FC', logo: 'liverpool.jpg' },
            { nom: 'Manchester City', logo: 'man-city.jpg' },
            { nom: 'Juventus', logo: 'juventus.jpg' },
            { nom: 'Chelsea FC', logo: 'chelsea.jpg' },
            { nom: 'Manchester United', logo: 'man-united.jpg' },
            { nom: 'Arsenal FC', logo: 'arsenal.jpg' },
            { nom: 'AC Milan', logo: 'ac-milan.jpg' },
            { nom: 'Borussia Dortmund', logo: 'dortmund.jpg' }
        ]);
        console.log('Équipes créées:', teams.length);

        // 3. Insérer les types d'événements
        const typeEvents = await TypeEvent.insertMany([
            { nom: 'Ligue 1' },
            { nom: 'Ligue des champions' },
            { nom: 'Europa League' },
            { nom: 'Liga' },
            { nom: 'Bundesliga' },
            { nom: 'Première League' }
        ]);
        console.log('Types d\'événements créés:', typeEvents.length);

        // 4. Insérer les utilisateurs
        const hashedPassword1 = await argon2.hash('ter');
        const hashedPassword2 = await argon2.hash('123');

        const users = await Utilisateur.insertMany([
            {
                email: 'alphavladitore@gmail.com',
                name: 'terry',
                password: hashedPassword1,
                role_id: roles[0]._id
            },
            {
                email: 'burgerking@gmail.com',
                name: '123',
                password: hashedPassword2,
                role_id: roles[1]._id
            },
            {
                email: 'Kfc@gmail.com',
                name: 'terry',
                password: hashedPassword1,
                role_id: roles[1]._id
            }
        ]);
        console.log('Utilisateurs créés:', users.length);

        // 5. Insérer les événements
        const events = await Event.insertMany([
            {
                team1_id: teams[0]._id,
                team2_id: teams[1]._id,
                typeEvent_id: typeEvents[1]._id
            },
            {
                team1_id: teams[0]._id,
                team2_id: teams[2]._id,
                typeEvent_id: typeEvents[1]._id
            },
            {
                team1_id: teams[5]._id,
                team2_id: teams[3]._id,
                typeEvent_id: typeEvents[1]._id
            },
            {
                team1_id: teams[3]._id,
                team2_id: teams[5]._id,
                typeEvent_id: typeEvents[1]._id
            }
        ]);
        console.log('Événements créés:', events.length);

        // 6. Insérer les restaurants
        const restaurants = await Restaurant.insertMany([
            {
                nom: 'KFC',
                description: 'Succombez à l\'authentique plaisir du poulet.',
                localisation: '176 Av. Gallieni, 93140 Bondy',
                menu: 'https://res.cloudinary.com/dbswf4zf2/image/upload/v1705246809/w4ubmnwkcj2ael14zxrc.png',
                utilisateur_id: users[2]._id,
                events: [events[0]._id]
            },
            {
                nom: 'Burger King',
                description: 'Goûtez la flamme, savourez le Whopper ! Burger King, là où les flammes rencontrent la saveur.',
                localisation: 'Rond-Point Du 6 Juin 1944, 77270 Villeparisis',
                menu: 'https://res.cloudinary.com/dbswf4zf2/image/upload/v1705246787/fxv8viqcnlbykdgvw5iv.png',
                utilisateur_id: users[1]._id,
                events: [events[1]._id]
            }
        ]);
        console.log('Restaurants créés:', restaurants.length);

        console.log('🎉 Base de données seedée avec succès !');
        
    } catch (error) {
        console.error('Erreur lors du seeding:', error);
    } finally {
        mongoose.connection.close();
    }
};

const runSeed = async () => {
    await connectDB();
    await seedDatabase();
};

runSeed();