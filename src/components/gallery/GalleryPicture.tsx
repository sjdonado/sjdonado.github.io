import type { Component } from 'solid-js';

import Img from '../Img';

interface GalleryPictureProps {
  data: string;
  shareURL: string;
}

const GalleryPicture: Component<GalleryPictureProps> = (props) => (
  <div class="flex flex-col items-start w-36 m-1">
    <a href={props.shareURL} target="_blank" rel="noreferrer">
      <Img class="object-contain w-36" src={props.data} alt={props.shareURL} />
    </a>
  </div>
);

export default GalleryPicture;
