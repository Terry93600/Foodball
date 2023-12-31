const pool = require("../service/dbConnection");
const argon2 = require("argon2");
const inscriptionController = {
	selectAll: async (req, res) => {
		try {
			const [rows, fields] = await pool.query("select * from utilisateur");
			res.json({
				data: rows,
			});
		} catch (error) {
			console.log(error);
			res.json({
				state: "error",
			});
		}
	},
	selectOne: async (req, res) => {
		try {
			const { id } = req.params;
			const [rows, fields] = await pool.query(
				"select * from utilisateur WHERE id = ?",
				[id],
			);
			res.json({
				data: rows,
			});
		} catch (error) {
			console.log(error);
		}
	},	 
	
	create: async (req, res) => {
		try {
		  const { email, name, password } = req.body;
		  const hashedPassword = await argon2.hash(password);
	  
		  // Insérer l'utilisateur dans la table utilisateur
		  const userSql =
			"INSERT INTO utilisateur (email, name, password, role_id) VALUES (?, ?, ?, 2)";
		  const [userRows, userFields] = await pool.query(userSql, [
			email,
			name,
			hashedPassword,
		  ]);
	  
		  // Récupérer l'ID de l'utilisateur nouvellement créé
		  const utilisateur_id = userRows.insertId;

// Insérer des données dans la table restaurant en utilisant l'ID de l'utilisateur
const restaurantSql =
  "INSERT INTO restaurant (nom, description, localisation, menu, utilisateur_id) VALUES (?, ?, ?, ?, ?)";
const [restaurantRows, restaurantFields] = await pool.query(restaurantSql, [
  "Nom du restaurant",
  "Description du restaurant",
  "Localisation du restaurant",
  "Menu du restaurant",
  utilisateur_id,
]);

// Récupérer l'ID du restaurant nouvellement créé
const restaurantId = restaurantRows.insertId;

// Sélectionner l'ID d'un événement existant (ici, l'ID 1)
const selectedEventId = 1; // Remplacez ceci par la logique permettant de sélectionner l'événement approprié

// Insérer des données dans la table restaurantEvent en utilisant l'ID du restaurant et l'ID de l'événement existant
const restaurantEventSql =
  "INSERT INTO restaurantEvent (restaurant_id, event_id) VALUES (?, ?)";
const [restaurantEventRows, restaurantEventFields] = await pool.query(
  restaurantEventSql,
  [restaurantId, selectedEventId]
);

res.json({
	utilisateur_id: utilisateur_id, // Inclure l'ID de l'utilisateur dans la réponse
	utilisateur: userRows,
	restaurant: restaurantRows,
	restaurantEvent: restaurantEventRows,
  });
  
		} catch (error) {
		  console.error(error);
		  res.status(500).json({
			error:
			  "Erreur lors de la création de l'utilisateur, du restaurant, de l'événement et de la relation restaurantEvent",
		  });
		}
	  },	  
	  
	update: async (req, res) => {
		try {
			const { email, name, password } = req.body;
			const { id } = req.params;
			const sql =
				"update utilisateur set email = ?, name = ?, password = ?  WHERE id =?";
			const [rows, fields] = await pool.query(sql, [email, name, password, id]);
			res.json({
				data: rows,
			});
		} catch (error) {
			console.log(error);
		}
	},
	delete: async (req, res) => {
		try {
			const { id } = req.params;
			const [rows, fields] = await pool.query(
				"delete * from utilisateur WHERE id = ?",
				[id],
			);
			res.json({
				data: rows,
			});
		} catch (error) {
			console.log(error);
		}
    },
    login: async (req, res) => {
		let rows;
		try {
			const { email, password } = req.body;
			rows = await pool.query(
				"SELECT utilisateur.*, role.nom FROM foodball.utilisateur JOIN foodball.role ON role.id = utilisateur.role_id WHERE utilisateur.email = ?",
				[email, password],
			);

			if (rows[0].length === 0) {
				return res.status(403).json({
					status: 403,
					message: "Forbidden",
				});
			} else {
				// vérifier le hash
				const verifyHash = await argon2.verify(rows[0][0].password, password);

				if (!verifyHash) {
					return res.status(403).json({
						status: 403,
						message: "Forbidden",
					});
				}

				return res.status(200).json({
					status: 200,
					message: "OK",
					data: rows.shift().shift(),
				});
			}
		} catch (error) {
			return res.status(400).json({
				status: 400,
				message: "Error",
			});
		}
	}
	// logout: async (req, res) => {
	// 	try {
	// 		// Ajoutez ici la logique de déconnexion appropriée, telle que l'invalidation du jeton de session, la suppression du jeton d'authentification, etc.
	// 		// Par exemple, si vous utilisez des jetons d'authentification JWT, vous pouvez simplement ne rien faire côté serveur et gérer l'expiration du jeton côté client.
	
	// 		res.status(200).json({
	// 			status: 200,
	// 			message: "Déconnexion réussie",
	// 		});
	// 	} catch (error) {
	// 		console.error(error);
	// 		res.status(500).json({
	// 			status: 500,
	// 			message: "Erreur lors de la déconnexion",
	// 		});
	// 	}
	// }
};

module.exports = inscriptionController;
