import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../../service/api';
import './log.css';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            setMessage('Token manquant');
            return;
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        // Validation
        if (password.length < 6) {
            setMessage('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        if (password !== confirmPassword) {
            setMessage('Les mots de passe ne correspondent pas');
            return;
        }

        setIsLoading(true);

        try {
            const response = await resetPassword(token, password);
            
            if (response.success) {
                setIsSuccess(true);
                setMessage(response.message);
                
                // Redirection après 3 secondes
                setTimeout(() => {
                    navigate('/connexion');
                }, 3000);
            } else {
                setIsSuccess(false);
                setMessage(response.message || 'Erreur lors de la réinitialisation');
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
                <h2>Nouveau mot de passe</h2>
                <p>Entrez votre nouveau mot de passe</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="password">Nouveau mot de passe :</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                            placeholder="Minimum 6 caractères"
                            minLength="6"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirmer le mot de passe :</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={isLoading}
                            placeholder="Répétez le mot de passe"
                            minLength="6"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={isLoading ? 'loading' : ''}
                    >
                        {isLoading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
                    </button>
                </form>

                {message && (
                    <div className={`message ${isSuccess ? 'success' : 'error'}`}>
                        {message}
                        {isSuccess && <div>Redirection vers la connexion...</div>}
                    </div>
                )}

                <div className="links">
                    <a href="/connexion">← Retour à la connexion</a>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;