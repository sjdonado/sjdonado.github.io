export type PostItem = {
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

export type SocialItem = {
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

export type SectionType = 'posts' | 'projects' | 'social' | 'slides';
export type SectionItem = PostItem & ProjectItem & SocialItem & SlideItem;
