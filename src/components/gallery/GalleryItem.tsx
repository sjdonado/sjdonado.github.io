import type { Component } from 'solid-js';

import Img from '../Img';

interface GalleryProps {
  imageURL: string;
  name: string;
  description: string;
}

const GalleryItem: Component<GalleryProps> = (props) => (
  <div class="flex flex-col items-start w-72 m-1 rounded-lg border h-full self-start">
    <Img class="object-cover object-right-top  w-72 h-48 rounded-t-lg bg-gray-100" src={props.imageURL} alt={props.name} />
    <div class="flex flex-col w-full">
      <span class="text-sm text-center border-b py-1">{props.name}</span>
      <span class="text-xs px-2 py-1">{props.description}</span>
    </div>
  </div>
);

export default GalleryItem;
