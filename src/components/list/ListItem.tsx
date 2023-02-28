import type { Component } from 'solid-js';

interface ListItemProps {
  imageURL: string;
  link: string;
  name: string;
  description: string;
}

const ListItem: Component<ListItemProps> = function ListItem(props) {
  return (
    <div class="flex items-center justify-start space-x-2 p-2">
      <a class="flex-none" href={props.link} target="_blank" rel="noreferrer">
        <img class="object-contain w-24 h-24 border rounded-lg border-grey-600" src={props.imageURL} alt={props.name} />
      </a>
      <span>{props.description}</span>
    </div>
  );
};

export default ListItem;
