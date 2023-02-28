import type { Component } from 'solid-js';

import Img from '../Img';

interface GalleryProps {
  imageURL: string;
  name: string;
  description: string;
}

const GalleryItem: Component<GalleryProps> = (props) => (
  <div class="flex flex-col items-start w-72 m-1 rounded-lg border h-full self-start">
    <Img class="object-cover w-72 rounded-t-lg" src={props.imageURL} alt={props.name} />
    <div class="flex flex-col text-sm mx-2 my-1">
      <span class="my-1 text-center border-b">{props.name}</span>
      <span>{props.description}</span>
    </div>
  </div>
);

export default GalleryItem;
