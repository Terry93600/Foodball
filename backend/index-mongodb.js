require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require('nodemailer');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

// Connexion MongoDB
const connectDB = require('./service/dbConnection');
connectDB();

// Import des modèles Mongoose (OBLIGATOIRE)
const Role = require('./models/Role');
const Utilisateur = require('./models/Utilisateur');
const Team = require('./models/Team');
const TypeEvent = require('./models/TypeEvent');
const Event = require('./models/Event');
const Restaurant = require('./models/Restaurant');

app.use(cors());
app.use(express.json());  

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, 'jwtSecretKey', (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });

    req.user = user;
    next();
  });
};

// Route sécurisée
app.get('/info-restaurant/:utilisateur_id', authenticateToken, (req, res) => {
  res.json({ message: 'Route sécurisée', user: req.user });
});

// Route email
// app.post('/send-email', async (req, res) => {
//   try {
//     const { name, email, team1, team2, event, localisation } = req.body;
//     const { additionalEmail } = req.query;

//     const transporter = nodemailer.createTransporter({
//       service: 'gmail',
//       auth: {
//         user: 'foodballofficiel@gmail.com',
//         pass: 'iwdr smju ygfm lkpd',
//       },
//     });

//     const mailOptions = {
//       from: 'foodballofficiel@gmail.com',
//       to: `${email},${additionalEmail}`,
//       subject: 'Réservation',
//       text: `La réservation sur le site Foodball : \nName: ${name}\nMatch: ${team1} - ${team2} ${event}\nAdresse : ${localisation} \n\n GARDEZ LE MAIL pour le montrer lors de votre arrivé au restaurant !!!`,
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true, message: "Email sent successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: error.toString() });
//   }
// });

// Route email - AVANT les autres routes
app.post('/send-email', async (req, res) => {
  try {
    console.log('📧 Réception demande email');
    console.log('Body:', req.body);
    console.log('Query:', req.query);

    const { name, email, team1, team2, event, localisation } = req.body;
    const { additionalEmail } = req.query;

    // Validation des données
    if (!name || !additionalEmail) {
      return res.status(400).json({ 
        success: false, 
        error: "Nom et email sont requis" 
      });
    }

    console.log('📤 Envoi email à:', `${email || 'N/A'},${additionalEmail}`);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'foodballofficiel@gmail.com',
        pass: process.env.EMAIL_PASS || 'iwdr smju ygfm lkpd',
      },
    });

    // Vérifier la connexion
    await transporter.verify();
    console.log('✅ Connexion SMTP OK');

    const mailOptions = {
      from: process.env.EMAIL_USER || 'foodballofficiel@gmail.com',
      to: email ? `${email},${additionalEmail}` : additionalEmail,
      subject: 'Confirmation de réservation - Foodball',
      html: `
        <h2>Confirmation de réservation</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Match :</strong> ${team1 || 'N/A'} - ${team2 || 'N/A'}</p>
        <p><strong>Événement :</strong> ${event || 'N/A'}</p>
        <p><strong>Adresse :</strong> ${localisation || 'N/A'}</p>
        <br>
        <p><strong>⚠️ IMPORTANT : Gardez ce mail pour le montrer lors de votre arrivée au restaurant !</strong></p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email envoyé:', info.messageId);

    res.status(200).json({ 
      success: true, 
      message: "Email envoyé avec succès",
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('❌ Erreur envoi email:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: error.toString() 
    });
  }
});

// Routes
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
const footballRouter = require('./routes/footballRouter');
const userRouter = require("./routes/userRouter");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: ["https://front.foodball.fr","http://localhost:5173"],
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
app.use('/api/football', footballRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} with MongoDB`);
});