import { For, createEffect, lazy, type Component } from 'solid-js';
import { HashRouter, Navigate, Route } from '@solidjs/router';

import Header from './sections/Header';
import Footer from './sections/Footer';

const Posts = lazy(() => import('./sections/Posts'));
const Projects = lazy(() => import('./sections/Projects'));
const Social = lazy(() => import('./sections/Social'));
const Slides = lazy(() => import('./sections/Slides'));

import Tabs from './components/Tabs';

import { Data, dataSchema } from './schemas';

import data from './data.json';

const parsedData = dataSchema.parse(data);

export type EnrichedRoute = {
  [T in keyof Data['sections']]: {
    title: string;
    path: string;
    type: T;
    items: Data['sections'][T]['items'];
    component: Component;
  };
}[keyof Data['sections']];

const routes: EnrichedRoute[] = [
  {
    title: parsedData.sections.posts.title,
    path: '/posts',
    type: 'posts',
    items: parsedData.sections.posts.items,
    component: () => <Posts items={parsedData.sections.posts.items} />,
  },
  {
    title: parsedData.sections.projects.title,
    path: '/projects',
    type: 'projects',
    items: parsedData.sections.projects.items,
    component: () => <Projects items={parsedData.sections.projects.items} />,
  },
  {
    title: parsedData.sections.social.title,
    path: '/social',
    type: 'social',
    items: parsedData.sections.social.items,
    component: () => <Social items={parsedData.sections.social.items} />,
  },
  {
    title: parsedData.sections.slides.title,
    path: '/slides',
    type: 'slides',
    items: parsedData.sections.slides.items,
    component: () => <Slides items={parsedData.sections.slides.items} />,
  },
];

const App: Component = () => {
  createEffect(() => {
    Promise.all([Posts, Projects, Social, Slides].map(component => component.preload()));
  });

  return (
    <div class="dark:bg-black">
      <main class="min-screen-1 mx-auto flex max-w-md flex-col gap-9 p-6 sm:max-w-4xl">
        <Header header={parsedData.header} />
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
            {route => <Route path={route.path} component={route.component} />}
          </For>
        </HashRouter>
      </main>
      <Footer header={parsedData.header} />
    </div>
  );
};

export default App;
