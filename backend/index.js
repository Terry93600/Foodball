const bcrypt = require("bcrypt");
const express = require("express")
const app = express()
const cors = require("cors");
const cookieParser = require("cookie-parser")

const mysql = require('mysql');

const salt = 10;


app.use(cors());
app.use(express.json())

require('dotenv').config();

app.post('/api/utilisateur', async (req, res) => {
    try {
        // Vérifier la présence des champs requis
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Utiliser bcrypt pour hacher le mot de passe
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Maintenant, utilisez `hashedPassword` dans votre requête SQL ou d'une autre manière appropriée
        const values = [name, email, hashedPassword];
        const sql = "INSERT INTO utilisateur (`name`, `email`, `password`) VALUES (?)";

        db.query(sql, [values], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Inserting data error in server' });
            }
            return res.json({ status: "Success" });
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


const roleRouter = require('./routes/roleRouter')
const inscriptionRouter = require('./routes/inscriptionRouter')
const connexionRouter = require('./routes/connexionRouter')
const typeEventRouter = require('./routes/typeEventRouter')
const teamRouter = require('./routes/teamRouter')
const userRouter = require('./routes/userRouter')
const restaurantRouter = require('./routes/restaurantRouter')
const eventrouter = require('./routes/eventRouter')
const restaurantEventRouter = require('./routes/restaurantEventRouter')
const menuRouter = require('./routes/menuRouter')
const platRouter = require('./routes/platRouter')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173"
}))


app.use("/api/role", roleRouter)
app.use("/api/utilisateur", inscriptionRouter)
app.use("/api/connexion", connexionRouter)
app.use("/api/typeEvent", typeEventRouter)
app.use("/api/menu", menuRouter)
app.use("/api/plat", platRouter)
app.use("/api/team", teamRouter)
app.use("/api/user", userRouter)
app.use("/api/restaurant", restaurantRouter)
app.use("/api/event", eventrouter)
app.use("/api/restaurantEvent", restaurantEventRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server ....")
})