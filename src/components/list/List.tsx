import { For, createSignal, createEffect } from 'solid-js';
import type { Component, JSX } from 'solid-js';

import ListItem from './ListItem';

export interface IListItem {
  name: string;
  imageURL: string;
  link: string;
  description: string;
}

const PAGINATION_ITEMS = 3;

const ITEMS: Record<string, (item: IListItem) => JSX.Element> = {
  listItem: (item: IListItem) => (
    <ListItem
      imageURL={item.imageURL}
      link={item.link}
      name={item.name}
      description={item.description}
    />
  ),
};

interface ListProps {
  title: string;
  id: string;
  itemType: string;
  items: IListItem[];
  isPaginated?: boolean;
}

const List: Component<ListProps> = (props) => {
  const [cursor, setCursor] = createSignal(0);

  const loadMore = () => {
    let newCursor = cursor() + PAGINATION_ITEMS;

    if (newCursor >= props.items.length) {
      newCursor = props.items.length;
    }

    setCursor(newCursor);
  };

  createEffect(() => {
    setCursor(props.isPaginated ? PAGINATION_ITEMS : props.items.length);
  });

  return (
    <section id={props.id} class="flex flex-col my-4">
      <a class="text-2xl my-4 underline" href={`#${props.id}`}>{props.title}</a>
      <div class="divide-y space-y-2">
        <For each={props.items.slice(0, cursor())}>{(item) => ITEMS[props.itemType](item)}</For>
      </div>
      {(props.isPaginated && cursor() < props.items.length) && (
        <button
          type="button"
          class="bg-transparent hover:text-gray-800 hover:border-gray-800 font-semibold text-gray-500 py-1 border rounded"
          onClick={loadMore}
        >
          Load more
        </button>
      )}
    </section>
  );
};

export default List;
