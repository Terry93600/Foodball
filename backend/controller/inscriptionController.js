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
			const sql =
				"insert into utilisateur (email, name, password, role_id ) values (?,?,?,2)";
			const [rows, fields] = await pool.query(sql, [
				email,
				name,
				hashedPassword,
			]);
			res.json({
				data: rows,
			});
		} catch (error) {
			console.log(error);
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

		// console.log(rows);
	}
};

module.exports = inscriptionController;
