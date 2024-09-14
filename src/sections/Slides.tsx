import { For } from 'solid-js';

import { SlideItem } from '../schemas';

export default function Slides(props: { items: SlideItem[] }) {
  return (
    <section class="flex flex-col gap-8">
      <ul class="timeline timeline-vertical timeline-compact timeline-snap-icon">
        <For each={props.items}>
          {slide => (
            <li>
              <hr />
              <div class="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="size-5"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  />
                </svg>
              </div>
              <div class="timeline-end mb-8">
                <time class="text-xs text-gray-500">{slide.date}</time>
                <h3 class="text-xl font-semibold">
                  <a
                    href={slide.link}
                    class="link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {slide.title}
                  </a>
                </h3>
                <p class="line-clamp-4 text-sm">{slide.description}</p>
              </div>
              <hr />
            </li>
          )}
        </For>
      </ul>
    </section>
  );
}
