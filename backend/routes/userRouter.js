const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// GET /api/user - Récupérer tous les utilisateurs
router.get('/', userController.selectAll);

// GET /api/user/:id - Récupérer un utilisateur par ID
router.get('/:id', userController.selectOne);

// POST /api/user - Créer un nouvel utilisateur
router.post('/', userController.create);

// PUT /api/user/:id - Mettre à jour un utilisateur
router.put('/:id', userController.update);

// DELETE /api/user/:id - Supprimer un utilisateur
router.delete('/:id', userController.delete);

module.exports = router;