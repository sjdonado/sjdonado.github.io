import type { Component } from 'solid-js';

import Header from './sections/Header';
import Articles from './sections/Articles';

const App: Component = () => {
  return (
    <div class="mx-auto my-12 flex h-dvh max-w-5xl flex-col gap-16 px-6">
      <Header />
      <Articles />
    </div>
  );
};

export default App;
