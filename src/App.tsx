import type { Component } from 'solid-js';
import { Navigate, Route, Router } from '@solidjs/router';

import Header from './sections/Header';
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
      <Header />
      <Router
        root={props => (
          <>
            <Tabs routes={ROUTES} />
            {props.children}
          </>
        )}
      >
        <Route path="/" component={() => <Navigate href="/articles" />} />
        {ROUTES.map(route => (
          <Route path={route.href} component={route.component} />
        ))}
      </Router>
    </div>
  );
};

export default App;
