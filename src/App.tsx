import { For, type Component } from 'solid-js';
import { HashRouter, Navigate, Route } from '@solidjs/router';

import Header from './sections/Header';
import Footer from './sections/Footer';

import Articles from './sections/Articles';
import Projects from './sections/Projects';
import Events from './sections/Events';
import Slides from './sections/Slides';
import Tabs from './components/Tabs';

export const ROUTES = [
  { href: '/articles', title: 'Articles', component: Articles },
  { href: '/projects', title: 'Projects', component: Projects },
  { href: '/events', title: 'Events', component: Events },
  { href: '/slides', title: 'Slides', component: Slides },
];

const App: Component = () => {
  return (
    <div class="mx-auto flex h-dvh max-w-5xl flex-col gap-16 px-6 py-12">
      <HashRouter
        root={props => (
          <>
            <Header />
            <Tabs routes={ROUTES} />
            {props.children}
            <Footer />
          </>
        )}
      >
        <Route path="/" component={() => <Navigate href="/articles" />} />
        <For each={ROUTES}>
          {route => <Route path={route.href} component={route.component} />}
        </For>
      </HashRouter>
    </div>
  );
};

export default App;
