import type { Component } from 'solid-js';

import Img from '../Img';

interface LinkPreviewProps {
  url: string;
  imageURL: string;
  title: string;
  description: string;
}

const LinkPreview: Component<LinkPreviewProps> = (props) => (
  <div class="flex flex-col border rounded-lg w-72 m-2">
    <a href={props.url} target="_blank" rel="noreferrer">
      <Img class="object-cover object-center rounded-lg w-full h-32" src={props.imageURL} alt={props.title} />
      <div class="w-full p-2">
        <p class="font-semibold m-b-4">{props.title}</p>
        <p class="text-xs text-gray-500 m-b-2">{props.description}</p>
        <span class="text-xs text-gray-500">{props.url.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '')}</span>
      </div>
    </a>
  </div>
);

export default LinkPreview;
