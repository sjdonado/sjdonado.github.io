import { For } from 'solid-js';
import { A } from '@solidjs/router';

import { EnrichedRoute } from '../App';

export default function Tabs(props: { routes: EnrichedRoute[] }) {
  return (
    <>
      <div role="tablist" class="tabs tabs-lifted">
        <For each={props.routes}>
          {route => (
            <A
              role="tab"
              class="tab relative font-semibold"
              activeClass="tab-active"
              href={route.path}
            >
              {route.title}
              <span class="absolute right-0 top-0 mr-2 mt-1 hidden rounded-full border bg-zinc-50 px-1 text-xs sm:block dark:border-zinc-700 dark:bg-base-100">
                {route.items.length > 9 ? '9+' : route.items.length}
              </span>
            </A>
          )}
        </For>
      </div>
    </>
  );
}
