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
              class="tab relative flex gap-2 font-semibold"
              activeClass="tab-active"
              href={route.path}
            >
              {route.title}
              <span class="rounded-full bg-gray-900 px-1 text-xs text-white">
                {route.items.length}
              </span>
            </A>
          )}
        </For>
      </div>
    </>
  );
};

export default Tabs;
