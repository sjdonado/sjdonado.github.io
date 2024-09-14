import { For } from 'solid-js';
import { Data } from '../schemas';

export default function Projects(props: {
  items: Data['sections']['projects']['items'];
}) {
  return (
    <section class="flex flex-row flex-wrap justify-center gap-2 lg:justify-start">
      <For each={props.items}>
        {project => (
          <div class="mx-auto flex flex-wrap justify-center rounded-lg border border-base-content/20">
            <div class="avatar">
              <div class="mt-4 size-32 rounded-lg border sm:mt-0 sm:h-full sm:w-40 sm:rounded-r-none sm:border-none">
                <img src={project.image} alt={project.title} class="bg-gray-200" />
              </div>
            </div>
            <div class="flex flex-col justify-center gap-2 p-4 sm:max-w-64">
              <h3 class="text-xl font-semibold">
                {project.link ? (
                  <a
                    href={project.link}
                    class="link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <p class="line-clamp-4 text-sm text-gray-500">{project.description}</p>
              {project.source && (
                <a
                  class="link text-xs font-semibold"
                  href={project.source}
                  target="_blank"
                >
                  Source code
                </a>
              )}
            </div>
          </div>
        )}
      </For>
    </section>
  );
}
