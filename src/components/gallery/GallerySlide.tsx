import type { Component } from 'solid-js';

import Img from '../Img';

interface GallerySlideProps {
  imageURL: string;
  name: string;
  link: string;
}

const GallerySlide: Component<GallerySlideProps> = (props) => (
  <div class="flex flex-col items-start w-72 m-1 rounded-lg border border-grey-600">
    <a href={props.link} target="_blank" rel="noreferrer">
      <Img class="object-cover w-72 rounded-lg" src={props.imageURL} alt={props.name} />
    </a>
  </div>
);

export default GallerySlide;
