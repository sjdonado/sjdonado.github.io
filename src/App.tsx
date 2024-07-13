import { For, lazy, type Component } from 'solid-js';
import { HashRouter, Navigate, Route } from '@solidjs/router';

import { SectionItem, SectionType } from './@types';

import Header from './sections/Header';
import Footer from './sections/Footer';

const Posts = lazy(() => import('./sections/Posts'));
const Projects = lazy(() => import('./sections/Projects'));
const Social = lazy(() => import('./sections/Social'));
const Slides = lazy(() => import('./sections/Slides'));

import Tabs from './components/Tabs';

import { sections } from './data.json';

const componentsBySectionType = {
  posts: Posts,
  projects: Projects,
  social: Social,
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
    <>
      <main class="min-screen-1 mx-auto flex max-w-5xl flex-col gap-9 p-6">
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
      </main>
      <Footer />
    </>
  );
};

export default App;
