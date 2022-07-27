/* eslint-disable react/no-danger */
import React from 'react';

import LinkPreview from '../common/LinkPreview';

const URL_REGEX = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))[.,]/;

interface MediaTypes {
  [key: string]: (item: any) => JSX.Element;
}

const MEDIA_TYPES: MediaTypes = {
  image: (url) => (
    <img
      className="object-contain border rounded-lg"
      src={url}
      alt="Post media"
    />
  ),
  celebration: (url) => (
    <img
      className="object-contain border rounded-lg"
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
  article: ({
    url,
    title,
    image,
    description,
  }) => (
    <LinkPreview
      url={url}
      title={title}
      image={image}
      description={description}
    />
  ),
  document: (url) => (
    <img
      className="object-contain border rounded-lg"
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
  const linkifyContent = content.replace(
    URL_REGEX,
    '<a href="$1" target="_blank" rel="noreferrer" class="underline">$1</a>',
  );

  return (
    <div className="flex items-start flex-wrap justify-start space-x-2 p-4">
      <div className="m-w-72 m-h-72 w-72 m-4">
        {MEDIA_TYPES[media.type](media.data)}
      </div>
      <div className="flex-1 flex flex-col w-full">
        <span className="text-sm text-gray-500 mb-2">{date}</span>
        <p className="text-justify m-w-64" dangerouslySetInnerHTML={{ __html: linkifyContent }} />
        <a className="underline text-right" href={link} target="_blank" rel="noreferrer">See more</a>
      </div>
    </div>
  );
};

export default PostItem;
