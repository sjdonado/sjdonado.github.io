import React from 'react';

const GalleryItem: React.FC<GalleryItem> = function GalleryItem({
  imageURL,
  name,
  description,
}) {
  return (
    <div className="flex flex-col items-start w-72 m-1 rounded-lg border h-full self-start">
      <img className="object-cover w-72 rounded-t-lg" src={imageURL} alt={name} />
      <div className="flex flex-col text-sm mx-2 my-1">
        <span className="my-1 text-center border-b">{name}</span>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default GalleryItem;
