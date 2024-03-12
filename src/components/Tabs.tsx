import { Component } from 'solid-js';
import { A } from '@solidjs/router';

const Tabs: Component<{ routes: { href: string; title: string }[] }> = props => {
  return (
    <>
      <div role="tablist" class="tabs tabs-lifted md:tabs-lg">
        {props.routes.map(route => (
          <A
            role="tab"
            class="tab font-semibold"
            activeClass="tab-active"
            href={route.href}
          >
            {route.title}
          </A>
        ))}
      </div>
    </>
  );
};

export default Tabs;
