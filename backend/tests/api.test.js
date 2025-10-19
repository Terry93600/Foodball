// Charger les variables d'environnement pour les tests
require('dotenv').config();

const mongoose = require('mongoose');

// Configuration pour les tests
beforeAll(async () => {
  console.log('MONGODB_URI présent:', !!process.env.MONGODB_URI);
  
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('API Foodball Tests', () => {
  
  test('Variables d\'environnement chargées', () => {
    expect(process.env.MONGODB_URI).toBeDefined();
  });

  test('MongoDB connexion fonctionne', async () => {
    expect(mongoose.connection.readyState).toBeGreaterThan(0);
  });

  test('API Restaurant retourne des données', async () => {
    const response = await fetch('http://localhost:3000/api/restaurant');
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('data');
    expect(Array.isArray(data.data)).toBe(true);
  });

  test('API Team retourne des données', async () => {
    const response = await fetch('http://localhost:3000/api/team');
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('data');
  });

  test('API Role retourne des données', async () => {
    const response = await fetch('http://localhost:3000/api/role');
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('data');
  });
});