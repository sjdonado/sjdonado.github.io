import type { Component } from 'solid-js';

import { header } from '../data.json';

const Profile: Component = () => {
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
      <div class="flex max-w-md flex-col justify-start md:justify-center">
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
      </div>
    </section>
  );
};

export default Profile;
