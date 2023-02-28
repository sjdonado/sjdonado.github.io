import { For } from 'solid-js';
import type { Component, JSX } from 'solid-js';

import data from './data.json';

import Avatar from './components/Avatar';
import List, { IListItem } from './components/list/List';
import Footer, { ISocialItem } from './components/Footer';
import Gallery, {
  IGalleryItem,
  IGallerySlide,
  IGalleryPicture,
  IGalleryLinkPreview,
} from './components/gallery/Gallery';

declare interface Section {
  title: string;
  id: string;
  type: string;
  items: Item[]
}

declare interface Site {
  profileImageURL: string;
  fullName: string;
  quote: string;
  footerMessage: string;
  social: ISocialItem[];
  sections: Section[];
}

type Item = IListItem & IGalleryItem & IGallerySlide & IGalleryPicture & IGalleryLinkPreview;

const SECTIONS: Record<string, (id: string, title: string, items: Item[]) => JSX.Element> = {
  list: (id, title, items) => (
    <List
      id={id}
      title={title}
      itemType="listItem"
      items={items}
    />
  ),
  links: (id, title, items) => (
    <Gallery
      id={id}
      title={title}
      itemType="galleryLinkPreview"
      items={items}
    />
  ),
  gallery: (id, title, items) => (
    <Gallery
      id={id}
      title={title}
      itemType="galleryItem"
      items={items}
    />
  ),
  slides: (id, title, items) => (
    <Gallery
      id={id}
      title={title}
      itemType="gallerySlide"
      items={items}
    />
  ),
  pictures: (id, title, items) => (
    <Gallery
      id={id}
      title={title}
      itemType="galleryPicture"
      items={items}
      seeMore="https://vsco.co/sjdonado"
    />
  ),
};

const App: Component = () => {
  const {
    profileImageURL,
    fullName,
    quote,
    sections,
    footerMessage,
    social,
  } = data as Site;

  return (
    <div class="bg-white">
      <Avatar
        profileImageURL={profileImageURL}
        fullName={fullName}
        quote={quote}
      />
      <div class="w-5/6 sm:w-4/6 m-auto">
        <For each={sections}>{({
          id,
          title,
          type,
          items,
        }) => SECTIONS[type](id, title, items)}</For>
      </div>
      <Footer
        footerMessage={footerMessage}
        social={social}
      />
    </div>
  );
};

export default App;
