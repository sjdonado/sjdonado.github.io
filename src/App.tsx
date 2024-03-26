import { For, lazy, type Component } from 'solid-js';
import { HashRouter, Navigate, Route } from '@solidjs/router';

import { SectionItem, SectionType } from './@types';

import Header from './sections/Header';
import Footer from './sections/Footer';

const Articles = lazy(() => import('./sections/Articles'));
const Projects = lazy(() => import('./sections/Projects'));
const Events = lazy(() => import('./sections/Events'));
const Slides = lazy(() => import('./sections/Slides'));

import Tabs from './components/Tabs';

import { sections } from './data.json';

const componentsBySectionType = {
  articles: Articles,
  projects: Projects,
  events: Events,
  slides: Slides,
};

const routes = sections.map(section => ({
  title: section.title,
  path: `/${section.type}`,
  type: section.type,
  items: section.items,
}));

const App: Component = () => {
  return (
    <div class="mx-auto flex h-dvh max-w-5xl flex-col gap-9 px-6 py-12">
      <Header />
      <HashRouter
        root={props => (
          <>
            <Tabs routes={routes} />
            {props.children}
          </>
        )}
      >
        <Route path="/" component={() => <Navigate href={routes[0].path} />} />
        <For each={routes}>
          {route => (
            <Route
              path={route.path}
              component={() =>
                componentsBySectionType[route.type as SectionType]({
                  items: route.items as SectionItem[],
                })
              }
            />
          )}
        </For>
      </HashRouter>
      <Footer />
    </div>
  );
};

export default App;
