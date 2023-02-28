import type { Component } from 'solid-js';

import Img from './Img';

interface AvatarProps {
  profileImageURL: string;
  fullName: string;
  quote: string;
}

const Avatar: Component<AvatarProps> = (props) => (
  <div class="flex flex-col items-center space-y-1 justify-between mb-4 mx-2">
    <Img
      class="object-cover w-64 h-64 my-2 rounded-full"
      src={props.profileImageURL}
      alt={props.fullName}
    />
    <h1 class="text-3xl text-center">{props.fullName}</h1>
    <p class="italic text-center">{props.quote}</p>
  </div>
);

export default Avatar;
