/* eslint-disable react/require-default-props */

import React, { useState } from 'react';
import ListItem from './ListItem';
import PostItem from './PostItem';

interface Props {
  title: string;
  id: string;
  itemType: string;
  items: ListItem[] | PostItem[];
  isPaginated?: boolean;
}

interface Items {
  [key: string]: (item: any) => JSX.Element;
}

const PAGINATION_ITEMS = 3;

const ITEMS: Items = {
  postItem: ({
    link,
    content,
    date,
    media,
  }: PostItem) => (
    <PostItem
      key={link}
      content={content}
      date={date}
      link={link}
      media={media}
    />
  ),
  listItem: ({
    imageURL,
    link,
    name,
    description,
  }: ListItem) => (
    <ListItem
      key={name}
      imageURL={imageURL}
      link={link}
      name={name}
      description={description}
    />
  ),
};

const List: React.FC<Props> = function List({
  title,
  id,
  itemType,
  items,
  isPaginated = false,
}: Props) {
  const [cursor, setCursor] = useState(isPaginated ? PAGINATION_ITEMS : items.length);

  const loadMore = () => {
    let newCursor = cursor + PAGINATION_ITEMS;

    if (newCursor >= items.length) {
      newCursor = items.length;
    }

    setCursor(newCursor);
  };

  return (
    <section id={id} className="flex flex-col my-4">
      <a className="text-2xl my-4 underline" href={`#${id}`}>{title}</a>
      <div className="divide-y space-y-2">
        {items.slice(0, cursor).map((item) => ITEMS[itemType](item))}
      </div>
      {(isPaginated && cursor < items.length) && (
        <button
          type="button"
          className="bg-transparent hover:text-gray-900 hover:border-gray-900 font-semibold text-gray-500 py-1 border rounded"
          onClick={loadMore}
        >
          Load more
        </button>
      )}
    </section>
  );
};

export default List;
