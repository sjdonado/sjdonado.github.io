import { For, type Component } from 'solid-js';

import type { PostItem } from '../@types';

const Posts: Component<{ items: PostItem[] }> = ({ items }) => {
  return (
    <section class="flex flex-col flex-wrap justify-center gap-4 lg:justify-start [&>div:not(:last-child)]:border-b">
      <For each={items}>
        {article => (
          <div class="flex flex-col justify-start border-base-content/20 p-4">
            <span class="text-xs text-gray-500">{article.date}</span>
            <a class="link" href={article.link} target="_blank" rel="noopener noreferrer">
              <h3 class="text-xl font-semibold">{article.title}</h3>
            </a>
            <div class="mt-4 flex flex-row gap-4">
              <p class="line-clamp-4 text-sm text-gray-500">{article.description}</p>
            </div>
          </div>
        )}
      </For>
    </section>
  );
};

export default Posts;
