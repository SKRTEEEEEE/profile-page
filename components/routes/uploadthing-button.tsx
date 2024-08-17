"use client";

import React, { useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";

export const UploadthingButton = () => {
  // Estado para manejar si ya se ha subido una imagen
  const [imageUploaded, setImageUploaded] = useState(false);

  return (
    <>
     {!imageUploaded ? (
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          console.log("Url: ",res[0].url)
          alert("Upload Completed");
          setImageUploaded(true); // Deshabilita el dropzone después de la subida
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
        onDrop={(acceptedFiles) => {
          if (acceptedFiles.length > 1) {
            alert("Please select only one file.");
          }
        }}
        disabled={imageUploaded} // Deshabilita el dropzone si ya se subió una imagen
        config={{
          mode: "auto", // Subida automática tras seleccionar archivo
        }}
      />):
        <p style={{ color: "green" }}>You have already uploaded an image.</p>
      }
    </>
  );
};
