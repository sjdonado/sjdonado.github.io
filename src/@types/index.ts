export type ArticleItem = {
  title: string;
  date: string;
  image: string;
  description: string;
  link: string;
};

export type ProjectItem = {
  title: string;
  link?: string;
  image: string;
  description: string;
  source: string;
};

export type EventItem = {
  title: string;
  date: string;
  description: string;
  image: string;
};

export type SlideItem = {
  title: string;
  date: string;
  description: string;
  link: string;
  image: string;
};

export type SectionType = 'articles' | 'projects' | 'events' | 'slides';
export type SectionItem = ArticleItem & ProjectItem & EventItem & SlideItem;
