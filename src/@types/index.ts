export type Header = {
  title: string;
  subtitle: string;
  username: string;
  bio: string;
  socialMedia: {
    link: string;
    icon: string;
  }[];
};

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

export type CustomRoute = {
  title: string;
  path: string;
  type: SectionType;
  items: SectionItem[];
};
