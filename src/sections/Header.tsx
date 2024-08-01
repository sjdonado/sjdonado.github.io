import { For, createEffect, type Component } from 'solid-js';
import { createIcons, icons } from 'lucide';

import { header } from '../data.json';

const Header: Component = () => {
  createEffect(() => {
    createIcons({ icons });
  });

  return (
    <section class="flex flex-col justify-center gap-4 md:justify-center">
      <div class="m-auto flex flex-col">
        <div class="badge badge-outline">{header.subtitle}</div>
        <h1 class="text-3xl font-bold md:text-4xl">{header.title}</h1>
        <h2 class="text-gray-500">{header.username}</h2>
        <div class="mt-2 flex flex-row gap-4">
          <For each={header.socialMedia}>
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
      </div>
      <p class="text-justify text-base">{header.bio}</p>
    </section>
  );
};

export default Header;
