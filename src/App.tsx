import type { Component } from 'solid-js';

import Header from './sections/Header';
import Articles from './sections/Articles';
import Projects from './sections/Projects';
import Events from './sections/Events';
import Slides from './sections/Slides';

const App: Component = () => {
  return (
    <div class="mx-auto flex h-dvh max-w-5xl flex-col gap-16 px-6 py-12">
      <Header />
      <Articles />
      <Projects />
      <Events />
      <Slides />
    </div>
  );
};

export default App;
