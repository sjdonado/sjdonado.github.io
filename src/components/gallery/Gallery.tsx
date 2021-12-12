import React from 'react';

import GalleryItem from './GalleryItem';
import GallerySlide from './GallerySlide';

interface Props {
  title: string;
  id: string;
  itemType: string;
  items: GalleryItem[] | GallerySlide[];
}

interface ItemsDictionary {
  [key: string]: (item: any) => JSX.Element;
}

const ITEMS: ItemsDictionary = {
  galleryItem: ({ imageURL, name, description }: GalleryItem) => (
    <GalleryItem
      imageURL={imageURL}
      name={name}
      description={description}
    />
  ),
  gallerySlide: ({ imageURL, link, name }: GallerySlide) => (
    <GallerySlide
      imageURL={imageURL}
      link={link}
      name={name}
    />
  ),
};

const Gallery: React.FC<Props> = function Gallery({
  title,
  id,
  itemType,
  items,
}) {
  return (
    <section id={id} className="flex flex-col w-4/6 m-auto my-4">
      <a className="text-2xl my-4 underline" href={`#${id}`}>{title}</a>
      <div className="flex flex-wrap justify-center">
        {items.map((item) => ITEMS[itemType](item))}
      </div>
    </section>
  );
};

export default Gallery;
