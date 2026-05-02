/**
 * Word Library · fixture data
 *
 * Real German→Indonesian words at all four learning stages. Used by every
 * Word Library wireframe screen. When porting to production, this data
 * comes from the Supabase `words` table via TanStack Query.
 */

export type WordStage = "planted" | "growing" | "almost" | "mastered";
export type WordType = "noun" | "verb" | "adj";
export type WordGender = "der" | "die" | "das";
export type WordSource = "dwds" | "ai";

export interface Word {
  w: string;
  tr: string;
  type: WordType;
  gender?: WordGender;
  stage: WordStage;
  /** "today" or a formatted date string like "Apr 25" */
  due: string;
  tags: string[];
  src: WordSource;
  reviews: number;
  /** Display string like "75%" or "—" */
  rate: string;
}

export const WORDS: Word[] = [
  { w: "die Sehnsucht", tr: "kerinduan", type: "noun", gender: "die", stage: "growing", due: "today", tags: ["emotion"], src: "dwds", reviews: 8, rate: "75%" },
  { w: "erfreulich", tr: "menyenangkan", type: "adj", stage: "almost", due: "Apr 25", tags: ["feeling"], src: "dwds", reviews: 12, rate: "83%" },
  { w: "der Alltag", tr: "keseharian", type: "noun", gender: "der", stage: "mastered", due: "May 2", tags: ["daily-life"], src: "dwds", reviews: 22, rate: "95%" },
  { w: "bedeuten", tr: "berarti", type: "verb", stage: "growing", due: "today", tags: ["core"], src: "dwds", reviews: 6, rate: "67%" },
  { w: "das Gleichgewicht", tr: "keseimbangan", type: "noun", gender: "das", stage: "planted", due: "Apr 22", tags: ["academic"], src: "ai", reviews: 0, rate: "—" },
  { w: "verlässlich", tr: "dapat diandalkan", type: "adj", stage: "almost", due: "Apr 27", tags: ["character"], src: "dwds", reviews: 10, rate: "80%" },
  { w: "die Geduld", tr: "kesabaran", type: "noun", gender: "die", stage: "mastered", due: "Jun 1", tags: ["virtue"], src: "dwds", reviews: 18, rate: "90%" },
  { w: "sich kümmern", tr: "peduli", type: "verb", stage: "growing", due: "Apr 23", tags: ["care"], src: "dwds", reviews: 4, rate: "50%" },
  { w: "die Heimat", tr: "kampung halaman", type: "noun", gender: "die", stage: "almost", due: "Apr 26", tags: ["home"], src: "dwds", reviews: 14, rate: "85%" },
  { w: "freundlich", tr: "ramah", type: "adj", stage: "mastered", due: "Jul 1", tags: ["character"], src: "dwds", reviews: 25, rate: "96%" },
  { w: "der Unterschied", tr: "perbedaan", type: "noun", gender: "der", stage: "planted", due: "Apr 21", tags: ["concept"], src: "dwds", reviews: 0, rate: "—" },
  { w: "begegnen", tr: "bertemu", type: "verb", stage: "growing", due: "today", tags: ["social"], src: "dwds", reviews: 5, rate: "60%" },
];

/** Stage counts for filter chips. In production these come from a Supabase
 *  aggregation query. */
export const STAGE_COUNTS = {
  total: 184,
  planted: 42,
  growing: 58,
  almost: 61,
  mastered: 23,
} as const;
