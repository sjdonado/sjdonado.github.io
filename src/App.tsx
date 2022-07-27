import React, { useCallback, useEffect, useState } from 'react';

import Avatar from './components/Avatar';
import List from './components/list/List';
import Gallery from './components/gallery/Gallery';
import Footer from './components/Footer';

import { getPublicData } from './services/database';

interface Sections {
  [key: string]: (id: string, title: string,
    items: PostItem[] | ListItem[] | GalleryItem[] | GallerySlide[]
    | GalleryPicture[]) => JSX.Element;
}

const SECTIONS: Sections = {
  posts: (id, title, items) => (
    <List
      key={id}
      id={id}
      title={title}
      itemType="postItem"
      items={items as PostItem[]}
      isPaginated
    />
  ),
  list: (id, title, items) => (
    <List
      key={id}
      id={id}
      title={title}
      itemType="listItem"
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
  pictures: (id, title, items) => (
    <Gallery
      key={id}
      id={id}
      title={title}
      itemType="galleryPicture"
      items={items as GalleryPicture[]}
      seeMore="https://vsco.co/sjdonado"
    />
  ),
};

const App: React.FC = function App() {
  const [statusMessage, setstatusMessage] = useState<string>();
  const [data, setData] = useState<DatabaseObject>();

  const fetch = useCallback(async () => {
    try {
      const res = await getPublicData();
      setData(res);
    } catch (err) {
      setstatusMessage('Unexpected error loading data, try again :(');
    }
  }, [setData]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (statusMessage != null) {
    <span>{statusMessage}</span>;
  }

  if (data == null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-800"
        />
      </div>
    );
  }

  const {
    profileImageURL,
    fullName,
    quote,
    sections,
    footerMessage,
    social,
  } = data.site;

  return (
    <div className="bg-white">
      <Avatar
        profileImageURL={profileImageURL}
        fullName={fullName}
        quote={quote}
      />
      <div className="w-5/6 sm:w-4/6 m-auto">
        {sections.map(({
          id,
          title,
          type,
          items,
        }) => SECTIONS[type](id, title, items))}
      </div>
      <Footer
        footerMessage={footerMessage}
        social={social}
      />
    </div>
  );
};

export default App;
