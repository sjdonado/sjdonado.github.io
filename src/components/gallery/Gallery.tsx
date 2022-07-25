import React from 'react';

import GalleryItem from './GalleryItem';
import GalleryPicture from './GalleryPicture';
import GallerySlide from './GallerySlide';

interface Props {
  title: string;
  id: string;
  itemType: string;
  items: GalleryItem[] | GallerySlide[] | GalleryPicture[];
}

interface Items {
  [key: string]: (item: any) => JSX.Element;
}

const ITEMS: Items = {
  galleryItem: ({ imageURL, name, description }: GalleryItem) => (
    <GalleryItem
      key={name}
      imageURL={imageURL}
      name={name}
      description={description}
    />
  ),
  gallerySlide: ({ imageURL, link, name }: GallerySlide) => (
    <GallerySlide
      key={name}
      imageURL={imageURL}
      link={link}
      name={name}
    />
  ),
  galleryPicture: ({ data, shareURL }: GalleryPicture) => (
    <GalleryPicture
      key={shareURL}
      data={data}
      shareURL={shareURL}
    />
  ),
};

const Gallery: React.FC<Props> = function Gallery({
  title,
  id,
  itemType,
  items,
}) {
  // TODO: https://css-tricks.com/seamless-responsive-photo-grid/
  return (
    <section id={id} className="flex flex-col flex-wrap my-4">
      <a className="text-2xl my-4 underline" href={`#${id}`}>{title}</a>
      <div className="flex flex-wrap justify-center">
        {items.map((item) => ITEMS[itemType](item))}
      </div>
    </section>
  );
};

export default Gallery;
