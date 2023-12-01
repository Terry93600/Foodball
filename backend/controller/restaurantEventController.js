const pool = require("../service/dbConnection");

const restaurantEventController = {
  selectAll: async (req, res) => {
    try {
      const [rows, fields] = await pool.query("SELECT * FROM restaurantEvent");
      res.json({
        data: rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  },

  selectOne: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query(
        "SELECT * FROM restaurantEvent WHERE restaurant_id = ?",
        [id]
      );
      res.json({
        data: rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  },

  create: async (req, res) => {
    try {
      const { restaurant_id, event_id } = req.body;
      const sql =
        "INSERT INTO restaurantEvent (restaurant_id, event_id) VALUES (?, ?)";
      const [rows, fields] = await pool.query(sql, [restaurant_id, event_id]);
      res.json({
        data: rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  },

//   update: async (req, res) => {
//     try {
//       const { restaurant_id, event_id } = req.body;
//       const { id } = req.params;
//       const sql =
//         "UPDATE restaurantEvent SET restaurant_id = ?, event_id = ? WHERE id = ?"
//         // "UPDATE restaurantEvent SET restaurant_id = ?, event_id = ? WHERE restaurant_id = ? AND event_id = ?"
//       const [rows, fields] = await pool.query(sql, [restaurant_id, event_id, id]);
//       res.json({
//         data: rows,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         error: "Internal Server Error",
//       });
//     }
//   },

update: async (req, res) => {
    try {
      const { restaurant_id, event_id } = req.body;
      const { id } = req.params;
      const sql =
        "UPDATE restaurantEvent SET restaurant_id = ?, event_id = ? WHERE restaurant_id = ?";
      const [rows, fields] = await pool.query(sql, [restaurant_id, event_id, id]);
      res.json({
        data: rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  },  

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const sql = "DELETE FROM restaurantEvent WHERE id = ?";
      const [rows, fields] = await pool.query(sql, [id]);
      res.json({
        data: rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  },
};

module.exports = restaurantEventController;
