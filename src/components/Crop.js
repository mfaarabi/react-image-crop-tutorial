import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import React, { useState } from 'react';

function CropDemo({ src }) {
  const [crop, setCrop] = useState({ aspect: 1 / 1, width: 30 });
  const [croppedImageUrl, setCroppedImageUrl] = useState(undefined);
  let imageRef;

  const onImageLoaded = image => (imageRef = image);

  const onComplete = crop => {
    makeClientCrop(crop);
  };

  const onChange = crop => {
    setCrop(crop);
  };

  const makeClientCrop = async crop => {
    console.log(crop);
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
        'newFile.jpeg'
      );
      console.log(croppedImageUrl);
      setCroppedImageUrl(croppedImageUrl);
    }
  };

  return (
    <>
      <ReactCrop
        src={src}
        crop={crop}
        ruleOfThirds
        onImageLoaded={onImageLoaded}
        onComplete={onComplete}
        onChange={onChange}
      />
      {croppedImageUrl && (
        <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
      )}
    </>
  );
}

function getCroppedImg(image, crop, fileName) {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        //reject(new Error('Canvas is empty'));
        console.error('Canvas is empty');
        return;
      }
      blob.name = fileName;
      const fileUrl
      window.URL.revokeObjectURL(this.fileUrl);
      const fileUrl = window.URL.createObjectURL(blob);
      resolve(fileUrl);
    }, 'image/jpeg');
  });
}

export default CropDemo;
