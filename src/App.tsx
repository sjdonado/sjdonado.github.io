import React from 'react';

import Avatar from './components/Avatar';
import List from './components/List';

import data from './data.json';

const App: React.FC = function App() {
  return (
    <>
      <Avatar
        profileImageURL={data.profileImageURL}
        fullName={data.fullName}
        quote={data.quote}
      />
      {data.sections.map(({ id, title, items }) => (
        <List
          key={id}
          id={id}
          title={title}
          items={items}
        />
      ))}
    </>
  );
};

export default App;
