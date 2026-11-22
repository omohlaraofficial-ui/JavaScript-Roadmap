export type DifficultyLevel = 'Beginner' | 'Early Intermediate' | 'Intermediate';

export type VisualSimulatorId =
  | 'variables-box'
  | 'data-types'
  | 'template-math'
  | 'conditionals-gate'
  | 'logical-switches'
  | 'loop-track'
  | 'function-machine'
  | 'array-train'
  | 'object-cabinet'
  | 'dom-selector'
  | 'dom-updater'
  | 'event-wire'
  | 'scope-rooms'
  | 'async-harbor'
  | 'fetch-json';

export interface FillGapSegment {
  type: 'text' | 'blank';
  value: string;
  blankId?: string;
}

export interface FillGapChallenge {
  prompt: string;
  lines: FillGapSegment[][];
  answers: Record<string, string>;
  wordBank: string[];
  hint: string;
  explanation: string;
}

export interface DebugTestCase {
  description: string;
  check: string; // JavaScript expression evaluated against { logs, exports }
}

export interface DebugChallenge {
  prompt: string;
  symptom: string;
  buggyCode: string;
  solutionCode: string;
  clue: string;
  /** Variable or function names to extract if defined, or we test console.log outputs */
  testDescription: string;
  expectedLogs?: string[];
  /** Custom assertion code executed inside sandbox after user code */
  assertionScript: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  stageId: string;
  order: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  simulatorId: VisualSimulatorId;
  plainEnglish: string;
  realLifeAnalogy: string;
  watchOutFor: string;
  codeExample: string;
  fillGap: FillGapChallenge;
  debug: DebugChallenge;
  quiz: QuizQuestion[];
}

export interface ProjectStep {
  id: string;
  title: string;
  instruction: string;
  checkPattern: string; // Regex string or logic description checked in JS/HTML/CSS
  targetFile: 'html' | 'css' | 'js';
}

export interface StageProject {
  id: string;
  stageId: string;
  title: string;
  summary: string;
  whatYouCombine: string;
  starterHtml: string;
  starterCss: string;
  starterJs: string;
  solutionHtml: string;
  solutionCss: string;
  solutionJs: string;
  steps: ProjectStep[];
}

export interface Stage {
  id: string;
  number: number;
  title: string;
  level: DifficultyLevel;
  summary: string;
  visualImage: string;
  visualCaption: string;
  lessons: Lesson[];
  project: StageProject;
}

export interface LessonCompletion {
  visualDone: boolean;
  fillGapDone: boolean;
  debugDone: boolean;
  quizDone: boolean;
}

export interface UserProgress {
  lessons: Record<string, LessonCompletion>;
  completedProjects: Record<string, boolean>;
  savedProjectCode: Record<string, { html: string; css: string; js: string }>;
}

export const XP_VALUES = {
  visual: 15,
  fillGap: 25,
  debug: 35,
  quiz: 20,
  project: 100,
} as const;
