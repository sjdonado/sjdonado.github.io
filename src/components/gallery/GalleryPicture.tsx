import React from 'react';

const GalleryPicture: React.FC<GalleryPicture> = function GalleryPicture({
  data,
  shareURL,
}) {
  return (
    <div className="flex flex-col items-start w-36 m-1">
      <a href={shareURL} target="_blank" rel="noreferrer">
        <img className="object-contain w-36" src={data} alt={shareURL} />
      </a>
    </div>
  );
};

export default GalleryPicture;
