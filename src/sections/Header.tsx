import type { Data } from '../schemas';

export default function Header(props: { header: Data['header'] }) {
  return (
    <section class="m-auto mt-4 flex flex-col justify-center md:max-w-3xl md:justify-center">
      <h1 class="text-4xl font-bold">{props.header.title}</h1>
      <h2 class="text-gray-500">{props.header.username}</h2>
      <p class="mt-2 text-justify text-sm md:text-base">{props.header.bio}</p>
    </section>
  );
}
