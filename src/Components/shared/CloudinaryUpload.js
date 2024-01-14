import React from 'react'
import { openUploadWidget } from "../../utils/CloudinaryService";
// import cloudinary_upload_preset from '../../config';
// require('dotenv').config()
// import { cloudinary_upload_preset } from '../../config';
const CloudinaryUpload = ({setUploadedSongFileUrl,setName,setUploadedSongFileDuration}) => {
    const uploadImageWidget = () => {
        let myUploadWidget = openUploadWidget(
          {
            cloudName:'dceoscoh1',
            uploadPreset:process.env.REACT_APP_cloudinary_upload_preset,
            sources: ["local", "url", "camera"]
          },
          function (error, result) {
            if (!error && result.event === "success") {
              setUploadedSongFileUrl(result.info.secure_url);
              setName(result.info.original_filename)
              setUploadedSongFileDuration(result.info.duration)
            }
          }
        );
        myUploadWidget.open();
      };
    
      return (
        <button className="bg-white text-black rounded-full p-4 font-semibold" onClick={uploadImageWidget}>
          Select Track
        </button>
      );
}

export default CloudinaryUpload
