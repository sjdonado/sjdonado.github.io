import { For } from 'solid-js';

import { ProjectItem } from '../@types';

export default function Projects(props: { items: ProjectItem[] }) {
  return (
    <section class="flex flex-row flex-wrap justify-center gap-4 lg:justify-start">
      <For each={props.items}>
        {project => (
          <div class="flex flex-wrap justify-center gap-4 rounded-lg border border-base-content/20 p-4">
            <div class="avatar m-auto">
              <div class="h-32 w-64 rounded-lg border sm:h-20 sm:w-32">
                <img src={project.image} alt={project.title} class="bg-gray-200" />
              </div>
            </div>
            <div class="flex flex-col justify-center gap-2 sm:max-w-72">
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
                <a class="link text-sm" href={project.source} target="_blank">
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
