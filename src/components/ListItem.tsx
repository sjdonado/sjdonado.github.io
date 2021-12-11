import React from 'react';

const ListItem: React.FC<Item> = function ListItem({
  imageURL,
  link,
  name,
  description,
}) {
  return (
    <div className="flex items-center justify-start p-2">
      <a className="flex-none" href={link} target="_blank" rel="noreferrer">
        <img className="object-contain w-24 h-24 border rounded-lg border-black" src={imageURL} alt={name} />
      </a>
      <span className="ml-2">{description}</span>
    </div>
  );
};

export default ListItem;
