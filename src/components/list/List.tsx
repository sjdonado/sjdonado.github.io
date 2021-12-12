import React from 'react';
import ListItem from './ListItem';

interface Props {
  title: string;
  id: string;
  items: ListItem[];
}

const List: React.FC<Props> = function List({
  title,
  id,
  items,
}) {
  return (
    <section id={id} className="flex flex-col w-4/6 m-auto my-4">
      <a className="text-2xl my-4 underline" href={`#${id}`}>{title}</a>
      <div className="divide-y space-y-2">
        {items.map(({
          imageURL,
          link,
          name,
          description,
        }) => (
          <ListItem
            imageURL={imageURL}
            link={link}
            name={name}
            description={description}
          />
        ))}
      </div>
    </section>
  );
};

export default List;
