import { For } from 'solid-js';
import type { Component, JSX } from 'solid-js';

export interface ISpotifyItem {
  src: string;
}

interface SpotifyProps {
  title: string;
  id: string;
  items: SpotifyItem[]
}

const Spotify: Component<SpotifyProps> = (props) => (
  <section id={props.id} class="flex flex-col flex-wrap my-4">
    <a class="text-2xl my-4 underline" href={`#${props.id}`}>{props.title}</a>
    <For each={props.items}>{(item) => (
      <iframe
        class="border-0"
        height="180"
        src={item.src}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        {...({ loading: 'lazy' } as JSX.IframeHTMLAttributes<HTMLIFrameElement>)}
      />
    )}</For>
  </section>
);

export default Spotify;
