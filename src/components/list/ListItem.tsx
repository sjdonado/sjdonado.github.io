import React from 'react';

const ListItem: React.FC<ListItem> = function ListItem({
  imageURL,
  link,
  name,
  description,
}) {
  return (
    <div className="flex items-center justify-start space-x-2 p-2">
      <a className="flex-none" href={link} target="_blank" rel="noreferrer">
        <img className="object-contain w-24 h-24 border rounded-lg border-grey-600" src={imageURL} alt={name} />
      </a>
      <span>{description}</span>
    </div>
  );
};

export default ListItem;
