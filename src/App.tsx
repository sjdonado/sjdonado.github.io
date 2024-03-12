import { For, type Component } from 'solid-js';
import { HashRouter, Navigate, Route } from '@solidjs/router';

import {
  ArticleItem,
  EventItem,
  ProjectItem,
  SectionItem,
  SectionType,
  SlideItem,
} from './@types';

import Header from './sections/Header';
import Footer from './sections/Footer';

import Articles from './sections/Articles';
import Projects from './sections/Projects';
import Events from './sections/Events';
import Slides from './sections/Slides';

import Tabs from './components/Tabs';

import { sections } from './data.json';

const componentsBySectionType = {
  articles: (items: ArticleItem[]) => <Articles items={items} />,
  projects: (items: ProjectItem[]) => <Projects items={items} />,
  events: (items: EventItem[]) => <Events items={items} />,
  slides: (items: SlideItem[]) => <Slides items={items} />,
};

const routes = sections.map(section => ({
  title: section.title,
  path: `/${section.type}`,
  type: section.type,
  items: section.items,
}));

const App: Component = () => {
  return (
    <div class="mx-auto flex h-dvh max-w-5xl flex-col gap-12 px-6 py-12">
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
              component={
                componentsBySectionType[route.type as SectionType](
                  route.items as SectionItem[]
                ) as object as Component
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
