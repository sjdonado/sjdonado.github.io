import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';

interface ImgProps {
  src: string;
  alt: string
  class?: string;
}

const Img: Component<ImgProps> = (props) => {
  const [isLoading, setIsLoading] = createSignal(true);

  const handleImageLoad = () => {
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div class="relative">
      {isLoading() && (
        <div class={`animate-pulse absolute inset-0 bg-gray-300 ${props.class ?? ''}`} />
      )}
      <img class={props.class} src={props.src} alt={props.alt} onLoad={handleImageLoad} />
    </div>
  );
};

export default Img;
