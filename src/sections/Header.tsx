import type { Component } from 'solid-js';

import {
  CameraIcon,
  GithubIcon,
  LayersIcon,
  LinkedinIcon,
  MailIcon,
  RssIcon,
} from 'lucide-solid';

import { header } from '../data.json';

const socialMedia = [
  { link: 'mailto:cedar.onyxes0q@icloud.com', icon: MailIcon },
  { link: 'https://github.com/sjdonado', icon: GithubIcon },
  { link: 'https://dev.to/sjdonado', icon: RssIcon },
  { link: 'https://linkedin.com/in/sjdonado', icon: LinkedinIcon },
  { link: 'https://stackoverflow.com/users/8108856/juan-rodriguez', icon: LayersIcon },
  { link: 'https://vsco.co/sjdonado/gallery', icon: CameraIcon },
];

const Header: Component = () => {
  return (
    <section class="flex flex-row flex-wrap justify-center gap-4 md:gap-12">
      <div class="avatar">
        <div class="w-64 rounded-lg">
          <img
            src="https://avatars.githubusercontent.com/u/27580836"
            alt="Juan Rodriguez Donado"
          />
        </div>
      </div>
      <div class="flex max-w-xl flex-col justify-start md:justify-center">
        <div class="badge badge-outline">{header.subtitle}</div>
        <h1 class="text-5xl font-bold">{header.title}</h1>
        <h4 class="mt-2 text-gray-500">{header.username}</h4>
        <p class="mt-4 text-justify">
          {header.description.split(/(https?:\/\/\S+)/g).map(segment => {
            if (/https?:\/\/\S+/.test(segment)) {
              return (
                <a class="underline" href={segment} target="_blank">
                  {segment}
                </a>
              );
            }
            return <span>{segment}</span>;
          })}
        </p>
        <div class="mt-4 flex flex-row gap-4">
          {socialMedia.map(({ link, icon: Icon }) => (
            <a class="link" href={link} target="_blank">
              <Icon class="size-6" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Header;
