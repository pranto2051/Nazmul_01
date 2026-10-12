import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

/**
 * ═════════════════════════════════════════════════════════════
 * [DATA] Content Collections & Zod Schemas (Astro 7 Content Layer)
 * ─────────────────────────────────────────────────────────────
 * Strict schema validation for all site content. Type mismatches
 * or missing required fields trigger descriptive build-time errors.
 * ═════════════════════════════════════════════════════════════
 */

// Controlled Vocabulary for Research Topics (§6.3)
export const TopicEnum = z.enum([
  'Artificial Intelligence',
  'Machine Learning',
  'Deep Learning',
  'Medical Image Analysis',
  'Explainable AI (XAI)',
  'Vision Transformers',
  'AI for Healthcare',
  'Trustworthy AI',
  '3D Segmentation'
]);

// 1. Profile & Site Singleton
const site = defineCollection({
  loader: file('./src/content/site/profile.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    shortName: z.string(),
    monogram: z.string(),
    currentRole: z.string(),
    institution: z.string(),
    location: z.string(),
    email: z.string(),
    phone: z.string().optional(),
    showPhoneOnSite: z.boolean().default(false),
    positioningLine: z.string(),
    bioShort: z.string().max(250),
    bioLong: z.array(z.string()),
    researchInterests: z.array(z.string()),
    currentFocus: z.object({
      title: z.string(),
      description: z.string(),
      highlights: z.array(z.string()),
    }),
    links: z.object({
      linkedin: z.string().optional(),
      googleScholar: z.string().optional(),
      orcid: z.string().optional(),
      github: z.string().optional(),
      researchGate: z.string().optional(),
      website: z.string().optional(),
    }),
    availability: z.string().optional(),
    lastUpdated: z.string(),
    verified: z.boolean().default(true),
  }),
});

// 2. Publications Collection (§6.1)
const publications = defineCollection({
  loader: file('./src/content/publications/publications.yaml'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    venueShort: z.string(),
    year: z.number().int(),
    month: z.string().optional(),
    pages: z.string().optional(),
    type: z.enum(['conference', 'journal', 'book-chapter', 'preprint']),
    status: z.enum(['published', 'accepted', 'in-press', 'under-review']),
    doi: z.string().optional(),
    pdfUrl: z.string().optional(),
    codeUrl: z.string().optional(),
    abstract: z.string().optional(),
    topics: z.array(TopicEnum),
    thumbnail: z.string(),
    figures: z.array(
      z.object({
        key: z.string(),
        caption: z.string(),
        credit: z.string().optional(),
      })
    ).optional(),
    bibtex: z.string().optional(),
    featured: z.boolean().default(false),
    verified: z.boolean().default(false),
    notes: z.string().optional(),
  }),
});

// 3. Research Case Studies Collection
const research = defineCollection({
  loader: glob({ base: './src/content/research', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    period: z.string(),
    role: z.string(),
    status: z.enum(['ongoing', 'completed']),
    stack: z.array(z.string()),
    results: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        kind: z.enum(['achieved', 'target']),
      })
    ),
    resultsVerified: z.boolean().default(false),
    figures: z.array(
      z.object({
        key: z.string(),
        category: z.string(),
        aspect: z.string(),
        caption: z.string(),
        credit: z.string(),
      })
    ),
    relatedPublicationIds: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    verified: z.boolean().default(false),
  }),
});

// 4. Education Collection
const education = defineCollection({
  loader: file('./src/content/education/education.yaml'),
  schema: z.object({
    id: z.string(),
    degree: z.string(),
    institution: z.string(),
    location: z.string(),
    period: z.string(),
    status: z.string(),
    grade: z.string(),
    thesisTitle: z.string().optional(),
    thesisPublicationId: z.string().optional(),
    description: z.string(),
    modules: z.array(z.string()).optional(),
    highlights: z.array(z.string()),
    verified: z.boolean().default(true),
  }),
});

// 5. Experience Collection
const experience = defineCollection({
  loader: file('./src/content/experience/experience.yaml'),
  schema: z.object({
    id: z.string(),
    role: z.string(),
    organisation: z.string(),
    location: z.string(),
    period: z.string(),
    type: z.enum(['research', 'professional']),
    current: z.boolean().default(false),
    bullets: z.array(z.string()),
    verified: z.boolean().default(true),
  }),
});

// 6. Teaching Collection
const teaching = defineCollection({
  loader: file('./src/content/teaching/teaching.yaml'),
  schema: z.object({
    id: z.string(),
    role: z.string(),
    institution: z.string(),
    location: z.string(),
    period: z.string(),
    title: z.string(),
    description: z.string(),
    photoKey: z.string().optional(),
    verified: z.boolean().default(true),
  }),
});

// 7. Awards Collection
const awards = defineCollection({
  loader: file('./src/content/awards/awards.yaml'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    issuer: z.string(),
    year: z.string(),
    description: z.string(),
    certificateKey: z.string().optional(),
    verified: z.boolean().default(true),
  }),
});

// 8. Projects Collection
const projects = defineCollection({
  loader: file('./src/content/projects/projects.yaml'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    context: z.string(),
    period: z.string(),
    category: z.string(),
    description: z.string(),
    stack: z.array(z.string()),
    bullets: z.array(z.string()),
    repoUrl: z.string().optional(),
    demoUrl: z.string().optional(),
    verified: z.boolean().default(true),
  }),
});

// 9. Skills Collection
const skills = defineCollection({
  loader: file('./src/content/skills/skills.yaml'),
  schema: z.object({
    id: z.string(),
    category: z.string(),
    order: z.number(),
    skills: z.array(z.string()),
    verified: z.boolean().default(true),
  }),
});

// 10. Gallery Collection
const gallery = defineCollection({
  loader: file('./src/content/gallery/gallery.yaml'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    category: z.enum([
      'Segmentation',
      'Architecture',
      'XAI',
      'Results',
      'Talks & Events',
      'Certificates',
    ]),
    imageKey: z.string(),
    aspect: z.enum(['square', 'wide', 'tall', 'portrait']),
    caption: z.string(),
    credit: z.string(),
    verified: z.boolean().default(false),
  }),
});

export const collections = {
  site,
  publications,
  research,
  education,
  experience,
  teaching,
  awards,
  projects,
  skills,
  gallery,
};
