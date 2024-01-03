const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require('nodemailer');
const cookieParser = require("cookie-parser");

const mysql = require("mysql");

app.use(cors());
app.use(express.json());

// app.post('/send-email', (req, res) => {
// 	const { name, email, message, team1, team2 } = req.body;
  
// 	// Configurer le transporteur
// 	const transporter = nodemailer.createTransport({
// 	  service: 'gmail',
// 	  auth: {
// 		user: 'foodballofficiel@gmail.com',
// 		pass: 'iwdr smju ygfm lkpd',
// 	  },
// 	});
  
// 	// Options du mail
// 	const mailOptions = {
// 	  from: 'foodballofficiel@gmail.com',
// 	  to: email, // Utiliser l'adresse e-mail provenant du formulaire
// 	  subject: 'Nouveau message du formulaire de contact',
// 	  text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message} Votre Réservation au nom de ${name} à bien été envoyer pour le match: ${team1} - ${team2} `,
// 	};
  
// 	// Envoyer l'e-mail
// 	transporter.sendMail(mailOptions, (error, info) => {
// 	  if (error) {
// 		console.error(error);
// 		return res.status(500).send(error.toString());
// 	  }
// 	  res.status(200).send('Email envoyé : ' + info.response);
// 	});
//   });
  
app.post('/send-email', async (req, res) => {
	try {
	  const { emails } = req.body;
  
	  // Configurer le transporteur
	  const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'foodballofficiel@gmail.com',
		  pass: 'iwdr smju ygfm lkpd',
		},
	  });
  
	  // Envoyer les e-mails
	  const emailPromises = emails.map(async ({ name, email, message, team1, team2, recipient }) => {
		// Options communes pour tous les courriels
		const commonMailOptions = {
		  from: 'foodballofficiel@gmail.com',
		  subject: 'Nouveau message du formulaire de contact',
		};
  
		// Personnaliser le texte du message pour chaque e-mail
		const mailOptions = {
		  ...commonMailOptions,
		  text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message} La Réservation au nom de ${name} à bien été envoyée pour le match: ${team1} - ${team2} `,
		};
  
		// Personnaliser le destinataire pour le deuxième e-mail
		if (recipient) {
		  mailOptions.to = recipient;
		} else {
		  mailOptions.to = email;
		}
  
		// Retourner la promesse pour cet envoi de courriel
		return new Promise((resolve, reject) => {
		  transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
			  console.error(error);
			  reject(error);
			} else {
			  resolve(info);
			}
		  });
		});
	  });
  
	  // Attendre que toutes les promesses d'envoi d'e-mails soient résolues
	  const emailResults = await Promise.all(emailPromises);
  
	  // Tous les courriels ont été envoyés avec succès
	  res.status(200).json({ success: true, messages: emailResults.map((info) => info.response) });
	} catch (error) {
	  // Au moins un courriel a échoué
	  console.error(`Erreur lors de l'envoi d'e-mails : ${error.message}`);
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
		origin: "http://localhost:5173",
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
