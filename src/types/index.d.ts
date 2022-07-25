declare interface PostItemMedia {
  type: string;
  data: string;
}

declare interface PostItem {
  content: string;
  date: string;
  link: string;
  media: PostItemMedia;
}

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

declare interface GalleryPicture {
  data: string;
  shareURL: string;
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

declare interface GithubContributions {
  totalCommitContributions: number;
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  totalRepositoryContributions: number;
  joinedGitHubContribution: string;
}

declare interface GithubLanguage {
  name: string;
  count: number;
  color: string;
}

declare interface GithubRepositories {
  totalCount: number;
  languages: GithubLanguage[];
}

declare interface GithubStats {
  contributions: GithubContributions;
  repositories: GithubRepositories;
  updatedAt: string;
}

declare interface Site {
  profileImageURL: string;
  fullName: string;
  quote: string;
  footerMessage: string;
  social: SocialItem[];
  sections: Section[];
}

declare interface DatabaseObject {
  githubStats: GithubStats;
  site: Site;
}

declare interface ContributionType {
  icon: string;
  name: string;
}
