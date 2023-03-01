import { For } from 'solid-js';
import type { Component, JSX } from 'solid-js';

import GalleryItem from './GalleryItem';
import GalleryPicture from './GalleryPicture';
import GallerySlide from './GallerySlide';
import GalleryLinkPreview from './GalleryLinkPreview';

export interface IGalleryItem {
  name: string;
  imageURL: string;
  description: string;
}

export interface IGallerySlide {
  name: string;
  imageURL: string;
  link: string;
}

export interface IGalleryPicture {
  imageURL: string;
  shareURL: string;
}

export interface IGalleryLinkPreview {
  title: string;
  imageURL: string;
  url: string;
  description: string;
}

type Item = IGalleryItem & IGallerySlide & IGalleryPicture & IGalleryLinkPreview;

const ITEMS: Record<string, (item: Item) => JSX.Element> = {
  galleryItem: (item: Item) => (
    <GalleryItem
      imageURL={item.imageURL}
      name={item.name}
      description={item.description}
    />
  ),
  gallerySlide: (item: Item) => (
    <GallerySlide
      imageURL={item.imageURL}
      link={item.link}
      name={item.name}
    />
  ),
  galleryPicture: (item: Item) => (
    <GalleryPicture
      data={item.imageURL}
      shareURL={item.shareURL}
    />
  ),
  galleryLinkPreview: (item: Item) => (
    <GalleryLinkPreview
      title={item.title}
      imageURL={item.imageURL}
      url={item.url}
      description={item.description}
    />
  ),
};

interface GalleryProps {
  title: string;
  id: string;
  itemType: string;
  items: Item[];
  sourceUrl?: string;
  sourceTitle?: string;
}

const Gallery: Component<GalleryProps> = (props) => (
  <section id={props.id} class="flex flex-col flex-wrap my-4">
    <a class="text-2xl my-4 underline" href={`#${props.id}`}>{props.title}</a>
    <div class="flex flex-wrap justify-center">
      <For each={props.items}>{(item) => ITEMS[props.itemType](item)}</For>
    </div>
    {props.sourceUrl && (
      <a
        href={props.sourceUrl}
        class="text-center hover:text-gray-800 hover:border-gray-800 font-semibold text-gray-500 py-1 m-4 border rounded"
        target="_blank"
        rel="noreferrer"
      >
        {props.sourceTitle}
      </a>
    )}
  </section>
);

export default Gallery;
