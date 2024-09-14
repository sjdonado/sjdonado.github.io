import { For, createEffect } from 'solid-js';
import { createIcons, icons } from 'lucide';

import { Data } from '../schemas';

export default function Footer(props: { header: Data['header'] }) {
  createEffect(() => {
    createIcons({ icons });
  });

  return (
    <footer class="inset-x-0 flex w-full flex-col items-center gap-4 bg-slate-50 py-8 text-xs dark:bg-base-100">
      <div class="flex flex-row justify-center gap-4">
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
      <p>A website by @sjdonado</p>
    </footer>
  );
}
