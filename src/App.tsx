import React from 'react';

import Avatar from './components/Avatar';
import List from './components/list/List';
import Gallery from './components/gallery/Gallery';
import Footer from './components/Footer';

import data from './data.json';

interface SectionsDictionary {
  [key: string]: (id: string, title: string,
    items: ListItem[] | GalleryItem[] | GallerySlide[]) => JSX.Element;
}

const SECTIONS: SectionsDictionary = {
  list: (id, title, items) => (
    <List
      key={id}
      id={id}
      title={title}
      items={items as ListItem[]}
    />
  ),
  gallery: (id, title, items) => (
    <Gallery
      key={id}
      id={id}
      title={title}
      itemType="galleryItem"
      items={items as GalleryItem[]}
    />
  ),
  slides: (id, title, items) => (
    <Gallery
      key={id}
      id={id}
      title={title}
      itemType="gallerySlide"
      items={items as GallerySlide[]}
    />
  ),
};

const App: React.FC = function App() {
  return (
    <>
      <Avatar
        profileImageURL={data.profileImageURL}
        fullName={data.fullName}
        quote={data.quote}
      />
      {data.sections.map(({
        id,
        title,
        type,
        items,
      }) => SECTIONS[type](id, title, items))}
      <Footer
        footerMessage={data.footerMessage}
        social={data.social}
      />
    </>
  );
};

export default App;
