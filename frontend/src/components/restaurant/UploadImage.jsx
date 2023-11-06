// import React, { useState, useEffect } from "react";
// import "./restaurant.css";
// import Axios from 'axios' 
// import ListePlat from "./Listeplats";

// const Plat = ({menu,nom}) => {
//     const [imageSelected, setImageSelected] = useState("");

//     const uploadImage = () => { 
//         const formData = new FormData();
//         formData.append("file", imageSelected);
//         formData.append("upload_preset", "tl6hgyho");
        
//         Axios.post(
//             "http://api.cloudinary.com/v1_1/dbswf4zf2/image/upload", 
//             formData
//         ).then((response) => {
//             console.log(response);
//         });
//     };

//     const cloudName = "dbswf4zf2";
//     const publicId = "jvfg1624id5vxhifvt5c";
//     const format = "png";

//   const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.${format}`;

//     return (
//         <div>
//             <input 
//                 type="file" 
//                 onChange={(event) => {
//                     setImageSelected(event.target.files[0]);
//                 }} 
//             />
//             <button onClick={uploadImage}>Upload Image</button>
//             <p>{menu}</p>
//             <p>qsdfudshyfgsdyf</p>
//             <p>{nom} </p>
//             <img src={imageUrl} alt="Image depuis Cloudinary" />
//             <img src={menu} alt="Image depuis Cloudinary" />
//         </div>
//     );
// }

// export default Plat;