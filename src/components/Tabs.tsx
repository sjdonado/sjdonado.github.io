import { Component, For } from 'solid-js';
import { A } from '@solidjs/router';

const Tabs: Component<{ routes: { href: string; title: string }[] }> = props => {
  return (
    <>
      <div role="tablist" class="tabs tabs-lifted md:tabs-lg">
        <For each={props.routes}>
          {route => (
            <A
              role="tab"
              class="tab font-semibold"
              activeClass="tab-active"
              href={route.href}
            >
              {route.title}
            </A>
          )}
        </For>
      </div>
    </>
  );
};

export default Tabs;
