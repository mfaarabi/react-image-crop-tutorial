import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import React, { useState } from "react";

function CropDemo({ src }) {
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  return (
    <ReactCrop src={src} crop={crop} onChange={newCrop => setCrop(newCrop)} />
  );
}

export default CropDemo;
