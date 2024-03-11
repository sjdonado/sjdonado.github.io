import type { Component } from 'solid-js';

import Profile from './sections/Header';

const App: Component = () => {
  return (
    <div class="m-8 flex h-dvh flex-col">
      <Profile />
    </div>
  );
};

export default App;
