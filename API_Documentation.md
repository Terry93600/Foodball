🍕⚽ Foodball

Application web de réservation de restaurants pour regarder des matchs de football

Foodball permet aux utilisateurs de découvrir et réserver des places dans des restaurants qui diffusent des matchs de football en direct.

📋 Fonctionnalités

🏪 Gestion des restaurants : Affichage et recherche de restaurants

⚽ Événements sportifs : Consultation des matchs diffusés

👥 Gestion des équipes : Base de données des équipes de football

🔐 Authentification : Système de connexion sécurisé

📧 Réservations : Envoi d'emails de confirmation

🔍 Recherche : Filtrage des restaurants par critères

🛠️ Technologies utilisées
Backend

Node.js + Express.js

MongoDB Atlas (Base de données cloud)

Mongoose (ODM pour MongoDB)

JWT (Authentification)

Argon2 (Hachage des mots de passe)

Nodemailer (Envoi d'emails)

Frontend

React.js

CSS3 (Responsive design)

Fetch API (Communication avec l'API)

🚀 Installation
Prérequis

Node.js (v16 ou supérieur)

npm ou yarn

Compte MongoDB Atlas

Backend
Cloner le projet
git clone [URL_DU_REPO]
cd Foodball/backend

Installer les dépendances
npm install

Configuration des variables d'environnement
Créer un fichier .env :
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foodball
PORT=3000
JWT_SECRET=votre_secret_jwt

Démarrer le serveur
npm start
# ou pour le développement
npm run dev

Frontend
Aller dans le dossier frontend
cd ../frontend

Installer les dépendances
npm install

Configuration
Créer un fichier .env :
VITE_API_URL=http://localhost:3000/api/

Démarrer l'application
npm run dev

🧪 Tests
cd backend
npm test


Les tests vérifient :

✅ Connexion MongoDB

✅ APIs principales (restaurants, équipes, rôles)

✅ Variables d'environnement

📡 API Endpoints
Restaurants

GET /api/restaurant - Liste tous les restaurants

GET /api/restaurant/:id - Détails d'un restaurant

Équipes

GET /api/team - Liste toutes les équipes

GET /api/team/:id - Détails d'une équipe

Événements

GET /api/event - Liste tous les événements

GET /api/typeEvent - Types d'événements

Authentification

POST /api/connexion - Connexion utilisateur

POST /api/utilisateur - Inscription utilisateur

Autres

GET /api/role - Rôles utilisateurs

GET /api/menu - Menus des restaurants

POST /send-email - Envoi d'email de réservation

🏗️ Structure du projet
Foodball/
├── backend/
│   ├── controller/          # Logique métier
│   ├── models/             # Modèles MongoDB
│   ├── routes/             # Routes API
│   ├── service/            # Services (DB, email)
│   ├── tests/              # Tests automatisés
│   └── index-mongodb.js    # Point d'entrée
└── frontend/
    ├── src/
    │   ├── components/     # Composants React
    │   ├── context/        # Context API
    │   └── service/        # Services API
    └── public/

🚀 Déploiement
Backend (Recommandations)

Heroku ou Railway pour l'hébergement

MongoDB Atlas (déjà configuré)

Variables d'environnement à configurer

Frontend

Vercel ou Netlify pour l'hébergement statique

Configuration de l'URL de l'API en production

📈 Évolutions possibles

📱 Application mobile React Native

🗺️ Géolocalisation des restaurants

💳 Système de paiement en ligne

📊 Dashboard administrateur

🔔 Notifications push

🐛 Résolution de problèmes
Erreur de connexion MongoDB
# Vérifier les variables d'environnement
echo $MONGODB_URI

Tests qui échouent
# S'assurer que le serveur tourne
node index-mongodb.js
# Puis lancer les tests
npm test

Frontend ne charge pas les données

Vérifier que l'API backend est démarrée

Contrôler l'URL dans VITE_API_URL

Vérifier la console du navigateur

📞 Support

Pour toute question ou problème, consulter :

Les logs du serveur

La console du navigateur

Les tests automatisés

Foodball - Où le football rencontre la gastronomie ! ⚽🍕