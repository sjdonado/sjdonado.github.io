import type { Component } from 'solid-js';

import { projects } from '../data.json';

const Projects: Component = () => {
  return (
    <section class="flex flex-col gap-8">
      <div class="flex flex-row flex-wrap justify-center gap-4 lg:justify-start">
        {projects.items.map(project => (
          <div class="flex flex-row flex-wrap justify-center gap-4 rounded-lg border p-4">
            <div class="avatar m-auto">
              <div class="h-20 w-32 rounded-lg border">
                <img src={project.image} alt={project.title} />
              </div>
            </div>
            <div class="flex max-w-[300px] flex-col justify-center gap-2">
              <h3 class="text-xl font-semibold">
                <a href={project.link} class="link" target="_blank">
                  {project.title}
                </a>
              </h3>
              <p class="line-clamp-4 text-sm text-gray-500">{project.description}</p>
              <a class="link text-sm" href={project.source} target="_blank">
                Source code
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
