import React from 'react';

const GallerySlide: React.FC<GallerySlide> = function GallerySlide({
  imageURL,
  name,
  link,
}) {
  return (
    <div className="flex flex-col items-start w-72 m-1 rounded-lg border border-grey-600">
      <a href={link} target="_blank" rel="noreferrer">
        <img className="object-cover w-72 rounded-lg" src={imageURL} alt={name} />
      </a>
    </div>
  );
};

export default GallerySlide;
