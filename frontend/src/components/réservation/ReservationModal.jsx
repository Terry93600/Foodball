import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ReservationModal({ restaurant, userId, onClose, onSuccess }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [form, setForm] = useState({
        date: '', heure: '', nombrePersonnes: 1
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!form.date) newErrors.date = 'La date est obligatoire';
        else if (new Date(form.date) < new Date()) newErrors.date = 'La date doit être dans le futur';
        if (!form.heure) newErrors.heure = "L'heure est obligatoire";
        if (!form.nombrePersonnes || form.nombrePersonnes < 1)
            newErrors.nombrePersonnes = 'Minimum 1 personne';
        if (form.nombrePersonnes > 20)
            newErrors.nombrePersonnes = 'Maximum 20 personnes';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${apiUrl}reservations`, {
                utilisateur_id: userId,
                restaurant_id: restaurant._id,
                ...form,
                nombrePersonnes: Number(form.nombrePersonnes)
            });
            toast.success('Réservation confirmée ! 🎉');
            onSuccess();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erreur lors de la réservation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>
                <h2>Réserver chez {restaurant.nom}</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Date *</label>
                        <input
                            type="date"
                            value={form.date}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={e => setForm({ ...form, date: e.target.value })}
                            className={errors.date ? 'error' : ''}
                        />
                        {errors.date && <span className="error-message">{errors.date}</span>}
                    </div>

                    <div>
                        <label>Heure *</label>
                        <input
                            type="time"
                            value={form.heure}
                            onChange={e => setForm({ ...form, heure: e.target.value })}
                            className={errors.heure ? 'error' : ''}
                        />
                        {errors.heure && <span className="error-message">{errors.heure}</span>}
                    </div>

                    <div>
                        <label>Nombre de personnes *</label>
                        <input
                            type="number"
                            value={form.nombrePersonnes}
                            min="1"
                            max="20"
                            onChange={e => setForm({ ...form, nombrePersonnes: e.target.value })}
                            className={errors.nombrePersonnes ? 'error' : ''}
                        />
                        {errors.nombrePersonnes && <span className="error-message">{errors.nombrePersonnes}</span>}
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Réservation en cours...' : '✅ Confirmer la réservation'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ReservationModal;    