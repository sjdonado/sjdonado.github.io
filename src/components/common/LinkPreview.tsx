import React from 'react';

const LinkPreview: React.FC<LinkPreview> = function LinkPreview({
  url,
  title,
  image,
  description,
}) {
  const parsedUrl = url.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '');
  return (
    <div className="flex flex-col border rounded-lg w-full">
      <a href={url} target="_blank" rel="noreferrer">
        <img className="object-cover object-center w-full h-32" src={image} alt={title} />
        <div className="w-full p-2">
          <p className="font-semibold m-b-4">{title}</p>
          <p className="text-xs text-gray-500 m-b-2">{description}</p>
          <span className="text-xs text-gray-500">{parsedUrl}</span>
        </div>
      </a>
    </div>
  );
};

export default LinkPreview;
