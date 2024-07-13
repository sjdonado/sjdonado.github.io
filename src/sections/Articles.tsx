import { For, type Component } from 'solid-js';

import type { ArticleItem } from '../@types';

const Articles: Component<{ items: ArticleItem[] }> = ({ items }) => {
  return (
    <section class="flex flex-row flex-wrap justify-center gap-4 lg:justify-start">
      <For each={items}>
        {article => (
          <div class="flex max-w-md flex-col flex-wrap justify-start rounded-lg border border-base-content/20 p-4">
            <span class="text-xs text-gray-500">{article.date}</span>
            <a class="link" href={article.link} target="_blank" rel="noopener noreferrer">
              <h3 class="text-xl font-semibold">{article.title}</h3>
            </a>
            <div class="mt-4 flex flex-row gap-4">
              <div class="avatar mx-auto pt-1">
                <div class="size-16 rounded-lg">
                  <img src={article.image} alt={article.title} class="bg-gray-200" />
                </div>
              </div>
              <div class="flex max-w-[340px] flex-col justify-center gap-1">
                <p class="line-clamp-4 text-sm text-gray-500">{article.description}</p>
              </div>
            </div>
          </div>
        )}
      </For>
    </section>
  );
};

export default Articles;
