// const mysql = require('mysql2')

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// })

// module.exports = pool.promise()

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connecté: ${conn.connection.host}`);
    } catch (error) {
        console.error('Erreur de connexion MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;