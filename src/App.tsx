import { For } from 'solid-js';
import type { Component, JSX } from 'solid-js';

import info from './data/info.json';

import aboutMeSection from './data/sections/about-me.json';
import ossAppsSection from './data/sections/oss-apps.json';
import eventsSection from './data/sections/events.json';
import slidesSection from './data/sections/slides.json';
import vscoPictureSection from './data/sections/vsco-pictures.json';
import mySoundtrackSection from './data/sections/my-soundtrack.json';
import devtoArticlesSection from './data/sections/devto-articles.json';

import Avatar from './components/Avatar';
import List from './components/list/List';
import Footer, { ISocialItem } from './components/Footer';
import Gallery, {
  IGalleryItem,
  IGallerySlide,
  IGalleryPicture,
  IGalleryLinkPreview,
} from './components/gallery/Gallery';
import Spotify, { ISpotifyItem } from './components/Spotify';

type GalleryItem = IGalleryItem & IGallerySlide & IGalleryPicture & IGalleryLinkPreview;
type Item = GalleryItem & ISpotifyItem;

declare interface Section {
  title: string;
  id: string;
  type: string;
  items: Item[]
}

declare interface Info {
  profileImageURL: string;
  fullName: string;
  quote: string;
  footerMessage: string;
  social: ISocialItem[];
}

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
      sourceUrl="https://vsco.co/sjdonado"
      sourceTitle="See more on VSCO"
    />
  ),
  spotify: (id, title, items) => (
    <Spotify
      id={id}
      title={title}
      items={items}
    />
  ),
};

const App: Component = () => {
  const {
    profileImageURL,
    fullName,
    quote,
    footerMessage,
    social,
  } = info as Info;

  const sections = [
    aboutMeSection,
    devtoArticlesSection,
    ossAppsSection,
    eventsSection,
    slidesSection,
    vscoPictureSection,
    mySoundtrackSection,
  ] as Section[];

  return (
    <div class="bg-white">
      <Avatar
        profileImageURL={profileImageURL}
        fullName={fullName}
        quote={quote}
      />
      <div class="w-5/6 sm:w-4/6 m-auto">
        <For
          fallback={<div>Loading...</div>}
          each={sections}>{({
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
