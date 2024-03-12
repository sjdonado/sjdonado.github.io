import { createEffect, createSignal } from 'solid-js';

import { events } from '../data.json';
import { createMasonryBreakpoints, Mason } from 'solid-mason';

const Events = () => {
  const [source] = createSignal(events.items);
  const [loadedImages, setLoadedImages] = createSignal(0);

  const [allImagesLoaded, setAllImagesLoaded] = createSignal(false);

  const breakpoints = createMasonryBreakpoints(() => [
    { query: '(min-width: 768px) ', columns: 3 },
    { query: '(min-width: 430px) and (max-width: 768px)', columns: 2 },
    { query: '(max-width: 430px)', columns: 1 },
  ]);

  const handleImageLoad = () => {
    setLoadedImages(prev => prev + 1);
  };

  createEffect(() => {
    if (loadedImages() === source().length) {
      setAllImagesLoaded(true);
    }
  });

  return (
    <section class="flex flex-col gap-8">
      {allImagesLoaded() ? (
        <Mason as="div" items={source()} columns={breakpoints()}>
          {event => (
            <div class="relative mx-auto my-2 max-w-xs overflow-hidden rounded-lg bg-no-repeat">
              <img class="max-w-xs" src={event.image} alt={event.name} />
              <div class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-900/80 p-2 text-white opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
                <span class="px-2 text-center">{event.name}</span>
                <span class="text-center text-xs">{event.year}</span>
                <p class="text-center text-sm">{event.description}</p>
              </div>
            </div>
          )}
        </Mason>
      ) : (
        <Mason as="div" items={source()} columns={breakpoints()}>
          {event => (
            <div class="skeleton mx-auto my-2 h-40 w-64 max-w-xs overflow-hidden rounded-lg">
              <img
                class="hidden"
                src={event.image}
                alt={event.name}
                onLoad={handleImageLoad}
              />
            </div>
          )}
        </Mason>
      )}
    </section>
  );
};

export default Events;
