import { For, createEffect } from 'solid-js';
import { createIcons, icons } from 'lucide';

import type { Header } from '../@types';

export default function Header(props: { header: Header }) {
  createEffect(() => {
    createIcons({ icons });
  });

  return (
    <section class="m-auto flex flex-col justify-center md:max-w-3xl md:justify-center">
      <div class="badge badge-outline">{props.header.subtitle}</div>
      <h1 class="text-2xl font-bold md:text-4xl">{props.header.title}</h1>
      <h2 class="text-gray-500">{props.header.username}</h2>
      <p class="my-4 text-justify text-sm md:text-base">{props.header.bio}</p>
      <div class="mt-2 flex flex-row gap-4">
        <For each={props.header.socialMedia}>
          {socialMedia => (
            <a
              class="link"
              href={socialMedia.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socialMedia.icon}
            >
              <i data-lucide={socialMedia.icon} class="size-6" />
            </a>
          )}
        </For>
      </div>
    </section>
  );
}
