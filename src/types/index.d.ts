declare interface ListItem {
  imageURL: string;
  link: string;
  name: string;
  description: string;
}

declare interface GalleryItem {
  imageURL: string;
  name: string;
  description: string;
}

declare interface GallerySlide {
  imageURL: string;
  link: string;
  name: string;
}

declare interface SocialItem {
  icon: string;
  link: string;
}

declare interface Section {
  title: string;
  id: string;
  type: string;
  items: ListItem[] | GalleryItem[] | GallerySlide[]
}

declare interface DatabaseObject {
  profileImageURL: string;
  fullName: string;
  quote: string;
  footerMessage: string;
  social: SocialItem[];
  sections: Section[];
}
