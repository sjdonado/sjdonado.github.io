import type { Component } from 'solid-js';

import { slides } from '../data.json';

const Slides: Component = () => {
  return (
    <section class="flex flex-col gap-8">
      <h2 class="text-3xl font-semibold">{slides.title}</h2>
      <ul class="list-inside">
        {slides.items.map(slide => (
          <li class="flex flex-col justify-center gap-1 p-4">
            <span class="text-xs text-gray-500">{slide.date}</span>
            <h3 class="text-xl font-semibold">
              <a href={slide.link} class="link" target="_blank">
                {slide.title}
              </a>
            </h3>
            <p class="line-clamp-4 text-sm">{slide.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Slides;
