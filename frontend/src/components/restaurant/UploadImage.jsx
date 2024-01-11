import React, { useState, useEffect } from "react";
import "./restaurant.css";
import Axios from "axios";
import { useParams } from "react-router-dom";
import UploadImageWrapper from "./UploadImageListe";
import "./Uploadimage.css"

const UploadImage = ({nom, restauId, key}) => {
  const [imageSelected, setImageSelected] = useState("");
  const [publicId, setPublicId] = useState("");
  const [restaurantData, setRestaurantData] = useState(null);
  const { critere } = useParams();

  useEffect(() => {
    // Charger les données du restaurant lors du montage du composant
    loadRestaurantData();
  }, [critere]);

  useEffect(() => {
    console.log("Données du restaurant :", restaurantData);
  }, [restaurantData]);
  

  const loadRestaurantData = () => {
    // Effectuer une requête pour récupérer les données du restaurant
    Axios.get(`http://localhost:3000/api/restaurant/${restauId}`)
      .then((response) => {
        setRestaurantData(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des données du restaurant :", error);
      });
  };

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "tl6hgyho");

    Axios.post("http://api.cloudinary.com/v1_1/dbswf4zf2/image/upload", formData)
      .then((response) => {
        const publicIdFromResponse = response.data.public_id;
        setPublicId(publicIdFromResponse);

        // Vérifier si des données de restaurant existent
        if (restaurantData) {
          // Si des données existent, effectuer une requête PUT
          sendPublicIdToBackend(publicIdFromResponse, "put");
        } else {
          // Sinon, effectuer une requête POST
          sendPublicIdToBackend(publicIdFromResponse, "post");
        }
      })
      .catch((error) => {
        console.error("Erreur lors du téléchargement de l'image :", error);
      });
  };

  const handleImageChange = (event) => {
    setImageSelected(event.target.files[0]);

    // Extraire dynamiquement le format de l'image
    const fileExtension = event.target.files[0].name.split('.').pop();
    console.log('Format de l\'image :', fileExtension);
  };

  const sendPublicIdToBackend = (publicId, method) => {
    // Construire l'URL de Cloudinary avec le public ID
    const cloudinaryUrl = `https://res.cloudinary.com/dbswf4zf2/image/upload/${publicId}.jpg`;

    // Déterminer l'URL en fonction de la méthode (POST ou PUT)
    const apiUrl = method === "put"
      ? `http://localhost:3000/api/restaurant/${restauId}/cloudinary`
      : "http://localhost:3000/api/restaurant";

    // Envoyer l'URL de Cloudinary au backend
    Axios({
      method: method,
      url: apiUrl,
      data: { menu: cloudinaryUrl }, // Envoyer l'URL de Cloudinary dans la propriété "menu"
    })
      .then((backendResponse) => {
        console.log("Réponse du backend :", backendResponse.data);
        // Vous pouvez faire d'autres traitements ici si nécessaire
      })
      .catch((backendError) => {
        console.error("Erreur lors de l'envoi de l'URL de Cloudinary au backend :", backendError);
      });
  };

  const cloudName = "dbswf4zf2";
  const format = "jpg";
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.${format}`;

  return (
    <div id="upload">
      <p>terry{restauId} </p>
    <div>
      <input
        type="file"
        onChange={handleImageChange}
      />
      <button onClick={uploadImage}>Mettre à jour le menu</button>
    </div>
    
    {publicId && (
      <img src={imageUrl} alt="Image depuis Cloudinary avec public ID" />
    )}
  </div>
);
};

export default UploadImage;
