/**
 * ═════════════════════════════════════════════════════════════
 * [DATA] Publications Utilities & Derived Metrics
 * ─────────────────────────────────────────────────────────────
 * All metrics displayed across the site (total conference papers,
 * journal articles, book chapters, latest active year, etc.) are
 * derived dynamically from the publication collection. Updating
 * the data file automatically synchronizes all portfolio statistics.
 * ═════════════════════════════════════════════════════════════
 */

export interface PublicationItem {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  venueShort: string;
  year: number;
  month?: string;
  pages?: string;
  type: 'conference' | 'journal' | 'book-chapter' | 'preprint';
  status: 'published' | 'accepted' | 'in-press' | 'under-review';
  doi?: string;
  pdfUrl?: string;
  codeUrl?: string;
  abstract?: string;
  topics: string[];
  thumbnail: string;
  figures?: Array<{ key: string; caption: string; credit?: string }>;
  bibtex?: string;
  featured?: boolean;
  verified?: boolean;
  notes?: string;
}

export interface PublicationMetrics {
  total: number;
  conferenceCount: number;
  journalCount: number;
  bookChapterCount: number;
  preprintCount: number;
  firstAuthorCount: number;
  latestYear: number;
  earliestYear: number;
  topicCounts: Record<string, number>;
}

export function computePublicationMetrics(publications: PublicationItem[]): PublicationMetrics {
  const total = publications.length;
  let conferenceCount = 0;
  let journalCount = 0;
  let bookChapterCount = 0;
  let preprintCount = 0;
  let firstAuthorCount = 0;
  let latestYear = 0;
  let earliestYear = 9999;
  const topicCounts: Record<string, number> = {};

  publications.forEach((pub) => {
    // Type counters
    if (pub.type === 'conference') conferenceCount++;
    else if (pub.type === 'journal') journalCount++;
    else if (pub.type === 'book-chapter') bookChapterCount++;
    else if (pub.type === 'preprint') preprintCount++;

    // First author detection
    if (pub.authors.length > 0) {
      const first = pub.authors[0].toLowerCase();
      if (first.includes('shouvo') || first.includes('nazmul')) {
        firstAuthorCount++;
      }
    }

    // Years
    if (pub.year > latestYear) latestYear = pub.year;
    if (pub.year < earliestYear) earliestYear = pub.year;

    // Topics
    pub.topics.forEach((t) => {
      topicCounts[t] = (topicCounts[t] || 0) + 1;
    });
  });

  return {
    total,
    conferenceCount,
    journalCount,
    bookChapterCount,
    preprintCount,
    firstAuthorCount,
    latestYear: latestYear || new Date().getFullYear(),
    earliestYear: earliestYear === 9999 ? new Date().getFullYear() : earliestYear,
    topicCounts,
  };
}

/**
 * Format authors with the owner's exact name highlighted in bold
 */
export function formatAuthorsHtml(authors: string[], ownerName = 'Nazmul Hasan Shouvo'): string {
  const target = ownerName.toLowerCase();
  return authors
    .map((author) => {
      const lower = author.toLowerCase();
      const isOwner =
        lower.includes(target) ||
        lower.includes('shouvo') ||
        lower.includes('nazmul hasan') ||
        lower.includes('n. h. shouvo');
      if (isOwner) {
        return `<strong>${author}</strong>`;
      }
      return author;
    })
    .join(', ');
}

/**
 * Generate a standard BibTeX record if one was not provided manually
 */
export function generateBibtex(pub: PublicationItem): string {
  if (pub.bibtex && pub.bibtex.trim().length > 0) {
    return pub.bibtex.trim();
  }

  const tag = pub.id.replace(/[^a-zA-Z0-9]/g, '');
  const authorString = pub.authors.join(' and ');
  const entryType =
    pub.type === 'conference' ? 'inproceedings' : pub.type === 'journal' ? 'article' : 'misc';

  return `@${entryType}{${tag},
  title={${pub.title}},
  author={${authorString}},
  ${pub.type === 'journal' ? `journal={${pub.venue}},` : `booktitle={${pub.venue}},`}
  year={${pub.year}}${pub.pages ? `,\n  pages={${pub.pages}}` : ''}${pub.doi ? `,\n  doi={${pub.doi}}` : ''}
}`;
}
