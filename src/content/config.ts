// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define schema types that can be reused
const baseSchema = {
  draft: z.boolean(),
  title: z.string(),
  snippet: z.string(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }),
  publishDate: z.string().transform(str => new Date(str)),
  category: z.string(),
  tags: z.array(z.string()),
};

// Blog-specific schema
const blogSchema = z.object({
  ...baseSchema,
  author: z.string().default('Astroship'),
});

// Scholarship-specific schema
const scholarshipSchema = z.object({
  ...baseSchema,
  provider: z.string(),
  amount: z.string(),
  deadline: z.string().transform(str => new Date(str)),
  eligibility: z.array(z.string()),
  requirements: z.array(z.string()),
  duration: z.string(),
  renewable: z.boolean(),
  applicationType: z.enum(['rolling', 'deadline']),
  level: z.array(z.enum(['undergraduate', 'graduate', 'phd', 'postdoc'])),
  fundingType: z.enum(['full', 'partial', 'variable']),
  location: z.string(),
  contact: z.object({
    email: z.string().email(),
    phone: z.string().optional(),
    website: z.string().url(),
  }),
});

// 3. Define your collection(s)
const blogCollection = defineCollection({
  schema: blogSchema,
});

const scholarshipCollection = defineCollection({
  schema: scholarshipSchema,
});

const teamCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    name: z.string(),
    title: z.string(),
    avatar: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.string().transform(str => new Date(str)),
  }),
});

// 4. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'blog': blogCollection,
  'scholarship': scholarshipCollection,
  'team': teamCollection,
};