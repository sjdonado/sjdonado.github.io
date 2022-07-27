/* eslint-disable react/require-default-props */
import React from 'react';

import GalleryItem from './GalleryItem';
import GalleryPicture from './GalleryPicture';
import GallerySlide from './GallerySlide';

interface Props {
  title: string;
  id: string;
  itemType: string;
  items: GalleryItem[] | GallerySlide[] | GalleryPicture[];
  seeMore?: string;
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
  seeMore = null,
}) {
  // TODO: https://css-tricks.com/seamless-responsive-photo-grid/
  return (
    <section id={id} className="flex flex-col flex-wrap my-4">
      <a className="text-2xl my-4 underline" href={`#${id}`}>{title}</a>
      <div className="flex flex-wrap justify-center">
        {items.map((item) => ITEMS[itemType](item))}
      </div>
      {seeMore && (
        <a
          href={seeMore}
          className="text-center hover:text-gray-800 hover:border-gray-800 font-semibold text-gray-500 py-1 m-4 border rounded"
          target="_blank"
          rel="noreferrer"
        >
          See more
        </a>
      )}
    </section>
  );
};

export default Gallery;
