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
};

// Project schema
const projectSchema = z.object({
  ...baseSchema,
  category: z.string(),
  projectType: z.string(),
  status: z.enum(['Open', 'Closed', 'In Progress']),
  targetGroup: z.string(),
  skillDetails: z.object({
    software: z.array(z.string()),
    hardware: z.array(z.string()),
    design: z.array(z.string()),
    other: z.array(z.string())
  })
});

// Blog schema remains unchanged
const blogSchema = z.object({
  ...baseSchema,
  category: z.string(),
  tags: z.array(z.string()),
  author: z.string().default('Astroship'),
});

// Updated Scholarship schema to match the PDF format
const scholarshipSchema = z.object({
  ...baseSchema,
  // Basic Information
  subtitle: z.string().optional(), // e.g., "Helping Student Moms Return to Their Academic Journey"
  category: z.string(), // e.g., "Education Support", "Conflict Recovery"
  description: z.string(),
  
  // Target Information
  targetGroup: z.string(), // e.g., "Student Mothers", "Conflict-Affected Students"
  academicLevel: z.array(z.enum([
    'high school',
    'college',
    'university',
    'vocational',
    'all'
  ])),
  
  // Support Details
  supportType: z.array(z.string()), // e.g., ["financial assistance", "mentorship", "academic resources"]
  
  // Award Information
  awardAmount: z.object({
    type: z.enum(['fixed', 'variable']),
    value: z.string(), // e.g., "$5000", "Varies"
    details: z.string().optional(), // Additional details about the award
    coverage: z.array(z.string()).optional() // What the award covers
  }),
  
  // Eligibility & Requirements
  eligibilityRequirements: z.array(z.string()),
  applicationRequirements: z.array(z.string()).optional(),
  
  // Application Process
  howToApply: z.array(z.string()),
  applicationProcess: z.array(z.string()).optional(),
  selectionCriteria: z.array(z.string()).optional(),
  
  // Deadlines & Dates
  applicationDeadline: z.string().transform(str => new Date(str)),
  importantDates: z.array(z.object({
    event: z.string(),
    date: z.string().transform(str => new Date(str))
  })).optional(),
  
  // Program Benefits
  benefits: z.array(z.string()).optional(),
  
  // Additional Information
  additionalInfo: z.string().optional(),
  renewalCriteria: z.array(z.string()).optional(),
  
  // Contact & Support
  contact: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    website: z.string().url().optional(),
    office: z.string().optional(),
    supportHours: z.string().optional()
  }).optional(),
  
  // Metadata
  status: z.enum(['active', 'inactive', 'upcoming']).default('active'),
  tags: z.array(z.string()).optional(),
  lastUpdated: z.string().transform(str => new Date(str)).optional()
});

// Team schema remains unchanged
const teamSchema = z.object({
  draft: z.boolean(),
  name: z.string(),
  title: z.string(),
  avatar: z.object({
    src: z.string(),
    alt: z.string(),
  }),
  publishDate: z.string().transform(str => new Date(str)),
});

// Tutor schema remains unchanged
const tutorSchema = z.object({
  draft: z.boolean(),
  name: z.string(),
  title: z.string(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }),
  publishDate: z.string().transform(str => new Date(str)),
  credentials: z.array(z.string()),
  specialties: z.array(z.string()),
  availability: z.object({
    monday: z.string().optional(),
    tuesday: z.string().optional(),
    wednesday: z.string().optional(),
    thursday: z.string().optional(),
    friday: z.string().optional(),
    saturday: z.string().optional(),
    sunday: z.string().optional()
  }),
  rates: z.object({
    individual: z.string(),
    group: z.string().optional()
  }),
  languages: z.array(z.string()),
  contact: z.object({
    email: z.string().email(),
    phone: z.string().optional(),
    zoom: z.string().optional()
  }),
  bio: z.string(),
  achievements: z.array(z.string()).optional(),
  testimonials: z.array(z.object({
    author: z.string(),
    text: z.string()
  })).optional()
});

// 3. Define the collections
const projectCollection = defineCollection({
  schema: projectSchema,
});

const blogCollection = defineCollection({
  schema: blogSchema,
});

const scholarshipCollection = defineCollection({
  schema: scholarshipSchema,
});

const teamCollection = defineCollection({
  schema: teamSchema,
});

const tutorCollection = defineCollection({
  schema: tutorSchema,
});

// 4. Export the collections
export const collections = {
  'project': projectCollection,
  'blog': blogCollection,
  'scholarship': scholarshipCollection,
  'team': teamCollection,
  'tutor': tutorCollection,
};