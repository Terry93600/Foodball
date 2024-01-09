const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require('nodemailer');
const cookieParser = require("cookie-parser");

const mysql = require("mysql");

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  try {
    // const { name, email, message, team1, team2 } = req.body;
    console.log(req.body);
    const { name, email, message } = req.body;
    // Configurer le transporteur
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'foodballofficiel@gmail.com',
        pass: 'iwdr smju ygfm lkpd',
      },
    });

    // Options du mail
    const mailOptions = {
      from: 'foodballofficiel@gmail.com',
      to: "foodballofficiel@gmail.com",
      subject: 'Sujet de e-mail',
      // text: `Corps du message de l'e-mail pour ${name}, équipe 1: ${team1}, équipe 2: ${team2}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.toString() });
  }
});
  

require("dotenv").config();
// const db = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password: "Xetfirst93@",
// 	database: "foodball",
// });

const roleRouter = require("./routes/roleRouter");
const inscriptionRouter = require("./routes/inscriptionRouter");
const connexionRouter = require("./routes/connexionRouter");
const typeEventRouter = require("./routes/typeEventRouter");
const teamRouter = require("./routes/teamRouter");
const restaurantRouter = require("./routes/restaurantRouter");
const eventrouter = require("./routes/eventRouter");
const restaurantEventRouter = require("./routes/restaurantEventRouter");
const menuRouter = require("./routes/menuRouter");
const platRouter = require("./routes/platRouter");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
	cors({
		origin: ["https://front.foodball.fr","http://localhost:5173"],
    // origin: "http://localhost:5173",
    // credentials: true,
	}),
);

app.use("/api/role", roleRouter);
app.use("/api/utilisateur", inscriptionRouter);
app.use("/api/connexion", connexionRouter);
app.use("/api/typeEvent", typeEventRouter);
app.use("/api/menu", menuRouter);
app.use("/api/plat", platRouter);
app.use("/api/team", teamRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/event", eventrouter);
app.use("/api/restaurantEvent", restaurantEventRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("Server ....");
});
