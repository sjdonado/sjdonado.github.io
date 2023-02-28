import { For } from 'solid-js';
import type { Component } from 'solid-js';

export interface ISocialItem {
  icon: string;
  link: string;
}

interface FooterProps {
  footerMessage: string;
  social: ISocialItem[];
}

const Footer: Component<FooterProps> = (props) => (
  <footer class="flex flex-col bg-gray-800 items-center w-full text-white space-y-8 py-16">
    <h2 class="text-2xl">{props.footerMessage}</h2>
    <div class="flex">
      <For each={props.social}>{(socialItem) => (
        <a class="text-2xl mx-2" href={socialItem.link} target="_blank" rel="noreferrer">
          <i class={socialItem.icon} />
        </a>
      )}</For>
    </div>
  </footer>
);

export default Footer;
