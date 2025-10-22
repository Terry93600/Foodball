const nodemailer = require('nodemailer');

// Configuration du transporteur email
const createTransporter = () => {
    return nodemailer.createTransport({  // 👈 ENLÈVE LE "ER" !
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Envoyer email de réinitialisation
const sendResetPasswordEmail = async (email, resetToken) => {
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    const mailOptions = {
        from: `"Foodball" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Réinitialisation de votre mot de passe - Foodball',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2c3e50;">Réinitialisation de mot de passe</h2>
                <p>Bonjour,</p>
                <p>Vous avez demandé la réinitialisation de votre mot de passe sur Foodball.</p>
                <p>Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" 
                       style="background-color: #3498db; color: white; padding: 12px 30px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        Réinitialiser mon mot de passe
                    </a>
                </div>
                <p><strong>Ce lien expire dans 1 heure.</strong></p>
                <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                <p style="color: #7f8c8d; font-size: 12px;">
                    Cet email a été envoyé automatiquement, merci de ne pas y répondre.
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email de réinitialisation envoyé à:', email);
        return true;
    } catch (error) {
        console.error('Erreur envoi email:', error);
        return false;
    }
};

module.exports = {
    sendResetPasswordEmail
};