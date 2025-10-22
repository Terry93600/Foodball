const mongoose = require('mongoose');
const Utilisateur = require('./models/Utilisateur');
const Restaurant = require('./models/Restaurant');
const Role = require('./models/Role');
const Team = require('./models/Team');
const TypeEvent = require('./models/TypeEvent');
const Event = require('./models/Event');
const argon2 = require('argon2');
require('dotenv').config();

async function resetDatabase() {
    try {
        console.log('🔄 Connexion à MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log('🗑️ Suppression des données existantes...');
        await Utilisateur.deleteMany({});
        await Restaurant.deleteMany({});
        await Role.deleteMany({});
        await Team.deleteMany({});
        await TypeEvent.deleteMany({});
        await Event.deleteMany({});
        
        console.log('✅ Données supprimées !');
        
        console.log('📝 Création des nouvelles données...');
        
        // 1. Créer les rôles
        const roleClient = await Role.create({
            nom: 'client',
            description: 'Utilisateur standard'
        });
        
        const roleAdmin = await Role.create({
            nom: 'admin',
            description: 'Administrateur'
        });
        
        // 2. Créer les équipes
        const psg = await Team.create({
            nom: 'Paris Saint-Germain',
            logo: 'https://logos-world.net/wp-content/uploads/2020/06/PSG-Logo.png'
        });
        
        const om = await Team.create({
            nom: 'Olympique de Marseille',
            logo: 'https://logos-world.net/wp-content/uploads/2020/06/Olympique-Marseille-Logo.png'
        });
        
        const lyon = await Team.create({
            nom: 'Olympique Lyonnais',
            logo: 'https://logos-world.net/wp-content/uploads/2020/06/Lyon-Logo.png'
        });
        
        // 3. Créer les types d'événements
        const ligue1 = await TypeEvent.create({
            nom: 'Ligue 1',
            description: 'Championnat de France'
        });
        
        const championsLeague = await TypeEvent.create({
            nom: 'Champions League',
            description: 'Ligue des Champions UEFA'
        });
        
        // 4. Créer des utilisateurs
        const hashedPassword = await argon2.hash('Password123');
        
        const adminUser = await Utilisateur.create({
            email: 'admin@foodball.com',
            nom: 'Admin',
            prenom: 'Super',
            telephone: '0123456789',
            password: hashedPassword,
            role_id: roleAdmin._id
        });
        
        const clientUser = await Utilisateur.create({
            email: 'client@foodball.com',
            nom: 'Dupont',
            prenom: 'Jean',
            telephone: '0612345678',
            password: hashedPassword,
            role_id: roleClient._id
        });
        
        // 5. Créer des événements AVEC LES BONS NOMS DE CHAMPS
        const event1 = await Event.create({
            nom: 'PSG vs OM',
            date: new Date('2024-12-15T20:00:00Z'),
            team1_id: psg._id,        // ✅ Corrigé
            team2_id: om._id,         // ✅ Corrigé
            typeEvent_id: ligue1._id  // ✅ Corrigé
        });
        
        const event2 = await Event.create({
            nom: 'Lyon vs PSG',
            date: new Date('2024-12-20T21:00:00Z'),
            team1_id: lyon._id,       // ✅ Corrigé
            team2_id: psg._id,        // ✅ Corrigé
            typeEvent_id: ligue1._id  // ✅ Corrigé
        });
        
        // 6. Créer des restaurants
        await Restaurant.create({
            nom: 'Le Ballon d\'Or',
            description: 'Restaurant sportif avec écrans géants pour regarder les matchs',
            localisation: '123 Rue du Sport',
            codePostal: '75015',
            ville: 'Paris',
            telephone: '0142157890',
            email: 'contact@ballondor.fr',
            capacite: 80,
            prixMoyen: 25,
            menu: 'Burgers, pizzas, plats traditionnels',
            utilisateur_id: adminUser._id,
            team1: psg._id,
            team2: om._id,
            typeEvent: ligue1._id
        });
        
        await Restaurant.create({
            nom: 'Chez Foot',
            description: 'Ambiance conviviale pour tous les matchs de football',
            localisation: '456 Avenue des Champions',
            codePostal: '13001',
            ville: 'Marseille',
            telephone: '0491234567',
            email: 'info@chezfoot.fr',
            capacite: 120,
            prixMoyen: 20,
            menu: 'Spécialités méditerranéennes',
            utilisateur_id: clientUser._id,
            team1: om._id,
            team2: psg._id,
            typeEvent: ligue1._id
        });
        
        await Restaurant.create({
            nom: 'Le Stade Gourmand',
            description: 'Restaurant familial avec retransmission de tous les matchs',
            localisation: '789 Boulevard du Football',
            codePostal: '69001',
            ville: 'Lyon',
            telephone: '0478901234',
            email: 'contact@stadegourmand.fr',
            capacite: 60,
            prixMoyen: 18,
            menu: 'Cuisine lyonnaise traditionnelle',
            utilisateur_id: clientUser._id,
            team1: lyon._id,
            team2: psg._id,
            typeEvent: championsLeague._id
        });
        
        console.log('🎉 Base de données réinitialisée avec succès !');
        console.log('👤 Utilisateurs créés :');
        console.log('   - admin@foodball.com / Password123');
        console.log('   - client@foodball.com / Password123');
        console.log('🏪 3 restaurants créés');
        console.log('⚽ 3 équipes créées');
        console.log('🎯 2 événements créés');
        console.log('');
        console.log('🧪 Testez maintenant avec :');
        console.log('POST http://localhost:3000/api/connexion');
        console.log('{ "email": "client@foodball.com", "password": "Password123" }');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur:', error);
        process.exit(1);
    }
}

resetDatabase();