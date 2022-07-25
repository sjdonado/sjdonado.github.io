import React from 'react';

import { LinkPreview } from '@dhaiwat10/react-link-preview';

interface MediaTypes {
  [key: string]: (item: any) => JSX.Element;
}

const MEDIA_TYPES: MediaTypes = {
  image: (url) => (
    <img
      className="object-contain w-64 border rounded-lg"
      src={url}
      alt="Post media"
    />
  ),
  celebration: (url) => (
    <img
      className="object-contain w-64 border rounded-lg"
      src={url}
      alt="Celebration gif"
    />
  ),
  video: (url) => (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video controls>
      <source src={url} type="video/mp4" />
    </video>
  ),
  article: (url) => (
    <LinkPreview
      url={url}
      width="16rem"
      height="8rem"
    />
  ),
  document: (url) => (
    <img
      className="object-contain w-64 border rounded-lg"
      src={url}
      alt="Document preview"
    />
  ),
};

const PostItem: React.FC<PostItem> = function PostItem({
  content,
  date,
  link,
  media,
}) {
  return (
    <div className="flex items-start flex-wrap justify-start space-x-2 p-4">
      <div className="m-w-64 w-64 m-h-64 m-4">
        {MEDIA_TYPES[media.type](media.data)}
      </div>
      <div className="flex-1 flex flex-col w-full">
        <span className="text-sm text-gray-500 mb-2">{date}</span>
        <p className="text-justify m-w-64">{content}</p>
        <a className="underline text-right" href={link} target="_blank" rel="noreferrer">See more</a>
      </div>
    </div>
  );
};

export default PostItem;
