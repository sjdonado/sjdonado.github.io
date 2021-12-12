import React from 'react';
import GalleryItem from './GalleryItem';

interface Props {
  title: string;
  id: string;
  items: GalleryItem[]
}

const Gallery: React.FC<Props> = function Gallery({
  title,
  id,
  items,
}) {
  return (
    <section id={id} className="flex flex-col w-4/6 m-auto">
      <a className="text-2xl my-4 underline" href={`#${id}`}>{title}</a>
      <div className="flex flex-wrap justify-center">
        {items.map(({
          imageURL,
          name,
          description,
        }) => (
          <GalleryItem
            imageURL={imageURL}
            name={name}
            description={description}
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
