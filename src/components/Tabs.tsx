import { Component, For } from 'solid-js';
import { A } from '@solidjs/router';

import { CustomRoute } from '../@types';

const Tabs: Component<{ routes: CustomRoute[] }> = props => {
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
              <span class="absolute right-0 top-0 mr-2 mt-1 hidden rounded-full bg-gray-900 px-1 text-xs text-white sm:block">
                {route.items.length > 9 ? '9+' : route.items.length}
              </span>
            </A>
          )}
        </For>
      </div>
    </>
  );
};

export default Tabs;
