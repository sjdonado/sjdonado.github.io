import type { Component } from 'solid-js';

import { Mason, createMasonryBreakpoints } from 'solid-mason';

import { events } from '../data.json';

const Events: Component = () => {
  const breakpoints = createMasonryBreakpoints(() => [
    { query: '(min-width: 768px) ', columns: 3 },
    { query: '(min-width: 425px) and (max-width: 768px)', columns: 2 },
    { query: '(max-width: 425px)', columns: 1 },
  ]);

  return (
    <section class="flex flex-col gap-8">
      <Mason as="div" items={events.items} columns={breakpoints()}>
        {event => (
          <div class="relative m-2 max-w-xs overflow-hidden rounded-lg bg-no-repeat">
            <img class="max-w-xs" src={event.image} alt={event.name} />
            <div class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-900/80 p-2 text-white opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
              <span class="px-2 text-center">{event.name}</span>
              <span class="text-center text-xs">{event.year}</span>
              <p class="text-center text-sm">{event.description}</p>
            </div>
          </div>
        )}
      </Mason>
    </section>
  );
};

export default Events;
