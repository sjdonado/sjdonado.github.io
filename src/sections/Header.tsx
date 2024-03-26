import { For, createEffect, type Component } from 'solid-js';
import { createIcons, icons } from 'lucide';

import { header } from '../data.json';

const Header: Component = () => {
  createEffect(() => {
    createIcons({ icons });
  });

  return (
    <section class="flex flex-row flex-wrap justify-center gap-4 md:gap-12">
      <div class="avatar">
        <div class="w-32 rounded-lg md:w-64">
          <img
            src="https://avatars.githubusercontent.com/u/27580836"
            alt="Juan Rodriguez Donado"
          />
        </div>
      </div>
      <div class="flex max-w-xl flex-col justify-start gap-4 md:justify-center">
        <div>
          <div class="badge badge-outline">{header.subtitle}</div>
          <h1 class="text-3xl font-bold md:text-5xl">{header.title}</h1>
          <h2 class="mt-2 text-gray-500">{header.username}</h2>
        </div>
        <p class="text-justify text-sm md:text-base">{header.bio}</p>
        <p class="text-justify text-sm md:text-base">{header.moreInfo}</p>
        <div class="flex flex-row gap-4">
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
    </section>
  );
};

export default Header;
