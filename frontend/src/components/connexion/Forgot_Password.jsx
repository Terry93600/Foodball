import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../../service/api';
import './log.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await forgotPassword(email);
            
           if (response.success) {
    setIsSuccess(true);
    setMessage(response.message);
    
    // 👇 AJOUTE CETTE REDIRECTION
    setTimeout(() => {
        navigate('/connexion');
    }, 3000);
} else {
    setIsSuccess(false);
    setMessage(response.message || 'Erreur lors de l\'envoi');
}
        } catch (error) {
            setIsSuccess(false);
            setMessage('Erreur de connexion au serveur');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="connexion-container">
            <div className="connexion-form">
                <h2>Mot de passe oublié</h2>
                <p>Entrez votre email pour recevoir un lien de réinitialisation</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email :</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                            placeholder="votre-email@exemple.com"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={isLoading ? 'loading' : ''}
                    >
                        {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
                    </button>
                </form>

{message && (
    <div className={`message ${isSuccess ? 'success' : 'error'}`}>
        {message}
        {isSuccess && <div>Redirection vers la connexion dans 3 secondes...</div>}
    </div>
)}

                <div className="links">
                    <a href="/connexion">← Retour à la connexion</a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;