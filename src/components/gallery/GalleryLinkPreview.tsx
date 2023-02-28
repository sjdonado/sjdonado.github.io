import type { Component } from 'solid-js';

interface LinkPreviewProps {
  url: string;
  title: string;
  image: string;
  description: string;
}

const LinkPreview: Component<LinkPreviewProps> = (props) => (
  <div class="flex flex-col border rounded-lg w-72 m-2">
    <a href={props.url} target="_blank" rel="noreferrer">
      <img class="object-cover object-center w-full h-32" src={props.image} alt={props.title} />
      <div class="w-full p-2">
        <p class="font-semibold m-b-4">{props.title}</p>
        <p class="text-xs text-gray-500 m-b-2">{props.description}</p>
        <span class="text-xs text-gray-500">{props.url.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '')}</span>
      </div>
    </a>
  </div>
);

export default LinkPreview;
