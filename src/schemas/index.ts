import { z } from 'zod';

const postItemSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string(),
  link: z.string().optional(),
  image: z.string().optional(),
});

const projectItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  link: z.string().optional(),
  source: z.string().optional(),
});

const socialItemSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string(),
  image: z.string(),
});

const slideItemSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string(),
  link: z.string(),
});

export const dataSchema = z.object({
  header: z.object({
    title: z.string(),
    username: z.string(),
    bio: z.string(),
    socialMedia: z.array(
      z.object({
        link: z.string(),
        icon: z.string(),
      })
    ),
  }),
  sections: z.object({
    posts: z.object({
      title: z.string(),
      items: z.array(postItemSchema),
    }),
    projects: z.object({
      title: z.string(),
      items: z.array(projectItemSchema),
    }),
    social: z.object({
      title: z.string(),
      items: z.array(socialItemSchema),
    }),
    slides: z.object({
      title: z.string(),
      items: z.array(slideItemSchema),
    }),
  }),
});

export type Data = z.infer<typeof dataSchema>;
