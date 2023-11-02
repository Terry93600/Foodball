// import { useState } from "react";
// import "./restaurant.css";
// import Axios from 'axios' 

// const [imageSelected, setImageSelected] = useState("")

// const uploadImage = (files) => {
//         const formData = new FormData()
//         formData.append("file", imageSelected)
//         formData.append("upload_preset", "tl6hgyho")
        
//         Axios.post("http://api.cloudinary.com/v1_1/dbswf4zf2/image/upload", formData).then((response)=> 
//             {console.log(response);
//         });
//     };


// const Plat = () => {
//     return <>
//             <div>
//                 <input 
//                     type="file" 
//                     onChange={(event) => {
//                         setImageSelected(event.target.files[0])
//                     }} 
//                 />
//                 <button onClick={uploadImage}>Upload Image</button>
//             </div>
//     </>
// }

// export default Plat;


import React, { useState } from "react";
import "./restaurant.css";
import Axios from 'axios' 

const Plat = () => {
    const [imageSelected, setImageSelected] = useState(""); // Déplacer ici l'état

    const uploadImage = () => { 
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "tl6hgyho");
        
        Axios.post(
            "http://api.cloudinary.com/v1_1/dbswf4zf2/image/upload", 
            formData
        ).then((response) => {
            console.log(response);
        });
    };

    const cloudName = "dbswf4zf2"; // Remplacez par votre nom de cloud
  const publicId = "jvfg1624id5vxhifvt5c"; // Remplacez par le public ID de l'image
  const format = "png"; // Remplacez par le format de l'image (jpg, png, etc.)

  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.${format}`;

    return (
        <div>
            <input 
                type="file" 
                onChange={(event) => {
                    setImageSelected(event.target.files[0]);
                }} 
            />
            <button onClick={uploadImage}>Upload Image</button>
            <img src={imageUrl} alt="Image depuis Cloudinary" />
        </div>
    );
}

export default Plat;
