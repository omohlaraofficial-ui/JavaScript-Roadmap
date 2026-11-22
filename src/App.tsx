import { useState, useEffect, useCallback, useMemo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { STAGES, ALL_LESSONS } from './data/curriculum';
import { LessonCompletion, UserProgress, XP_VALUES } from './types/curriculum';
import { RoadmapOverview } from './components/RoadmapOverview';
import { LessonWorkspace } from './components/LessonWorkspace';
import { ProjectStudio } from './components/ProjectStudio';
import { ProjectsHub } from './components/ProjectsHub';
import { ProgressView } from './components/ProgressView';
import { OfflineIndicator } from './components/PWAControls';

type AppRoute =
  | { view: 'roadmap' }
  | { view: 'lesson'; stageId: string; lessonId: string }
  | { view: 'project'; stageId: string }
  | { view: 'projects-hub' }
  | { view: 'progress' };

const STORAGE_KEY = 'clearscript_progress_v1';

const EMPTY_PROGRESS: UserProgress = {
  lessons: {},
  completedProjects: {},
  savedProjectCode: {},
};

const DEFAULT_COMPLETION: LessonCompletion = {
  visualDone: false,
  fillGapDone: false,
  debugDone: false,
  quizDone: false,
};

function loadSavedProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<UserProgress>;
    return {
      lessons: parsed.lessons || {},
      completedProjects: parsed.completedProjects || {},
      savedProjectCode: parsed.savedProjectCode || {},
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>({ view: 'roadmap' });
  const [progress, setProgress] = useState<UserProgress>(loadSavedProgress);
  const [xpNotice, setXpNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  useEffect(() => {
    if (!xpNotice) return;
    const t = setTimeout(() => setXpNotice(null), 2600);
    return () => clearTimeout(t);
  }, [xpNotice]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);

  const totalXp = useMemo(() => {
    const lessonXp = ALL_LESSONS.reduce((sum, lesson) => {
      const c = progress.lessons[lesson.id];
      if (!c) return sum;
      return (
        sum +
        (c.visualDone ? XP_VALUES.visual : 0) +
        (c.fillGapDone ? XP_VALUES.fillGap : 0) +
        (c.debugDone ? XP_VALUES.debug : 0) +
        (c.quizDone ? XP_VALUES.quiz : 0)
      );
    }, 0);

    const projectXp = Object.values(progress.completedProjects).filter(Boolean).length * XP_VALUES.project;
    return lessonXp + projectXp;
  }, [progress]);

  const maxPossibleXp = useMemo(() => {
    const perLesson =
      XP_VALUES.visual + XP_VALUES.fillGap + XP_VALUES.debug + XP_VALUES.quiz;
    return ALL_LESSONS.length * perLesson + STAGES.length * XP_VALUES.project;
  }, []);

  const completedLessonsCount = useMemo(() => {
    return ALL_LESSONS.filter((l) => {
      const c = progress.lessons[l.id];
      return c && c.visualDone && c.fillGapDone && c.debugDone && c.quizDone;
    }).length;
  }, [progress]);

  const completedProjectsCount = useMemo(() => {
    return STAGES.filter((s) => progress.completedProjects[s.project.id]).length;
  }, [progress]);

  const nextLesson = useMemo(() => {
    const incomplete = ALL_LESSONS.find((l) => {
      const c = progress.lessons[l.id];
      return !(c && c.visualDone && c.fillGapDone && c.debugDone && c.quizDone);
    });
    const chosen = incomplete || ALL_LESSONS[0];
    return {
      stageId: chosen.stageId,
      lessonId: chosen.id,
      title: chosen.title,
    };
  }, [progress]);

  const handleCompleteStep = useCallback(
    (
      lessonId: string,
      step: 'visualDone' | 'fillGapDone' | 'debugDone' | 'quizDone',
      xp: number
    ) => {
      setProgress((prev) => {
        const current = prev.lessons[lessonId] || DEFAULT_COMPLETION;
        if (current[step]) return prev;
        setXpNotice(`+${xp} XP earned!`);
        return {
          ...prev,
          lessons: {
            ...prev.lessons,
            [lessonId]: {
              ...current,
              [step]: true,
            },
          },
        };
      });
    },
    []
  );

  const handleSaveProjectCode = useCallback(
    (projectId: string, code: { html: string; css: string; js: string }) => {
      setProgress((prev) => ({
        ...prev,
        savedProjectCode: {
          ...prev.savedProjectCode,
          [projectId]: code,
        },
      }));
    },
    []
  );

  const handleCompleteProject = useCallback((projectId: string) => {
    setProgress((prev) => {
      if (prev.completedProjects[projectId]) return prev;
      setXpNotice(`+${XP_VALUES.project} XP earned for completing the Stage Project!`);
      return {
        ...prev,
        completedProjects: {
          ...prev.completedProjects,
          [projectId]: true,
        },
      };
    });
  }, []);

  const handleResetProgress = useCallback(() => {
    setProgress(EMPTY_PROGRESS);
    setXpNotice('Progress reset to 0 XP.');
  }, []);

  const openLesson = (stageId: string, lessonId: string) => {
    setRoute({ view: 'lesson', stageId, lessonId });
  };

  const openProject = (stageId: string) => {
    setRoute({ view: 'project', stageId });
  };

  const activeStage =
    route.view === 'lesson' || route.view === 'project'
      ? STAGES.find((s) => s.id === route.stageId) || STAGES[0]
      : null;

  const activeLesson =
    route.view === 'lesson' && activeStage
      ? activeStage.lessons.find((l) => l.id === route.lessonId) || activeStage.lessons[0]
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => setRoute({ view: 'roadmap' })}
            className="font-display text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer"
          >
            ClearScript
          </button>

          {/* Zone 2: 4 single-line text nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => setRoute({ view: 'roadmap' })}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                route.view === 'roadmap' ? 'text-slate-900 underline underline-offset-4' : ''
              }`}
            >
              Roadmap
            </button>
            <button
              type="button"
              onClick={() => openLesson(nextLesson.stageId, nextLesson.lessonId)}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                route.view === 'lesson' ? 'text-slate-900 underline underline-offset-4' : ''
              }`}
            >
              Visual Lab
            </button>
            <button
              type="button"
              onClick={() => setRoute({ view: 'projects-hub' })}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                route.view === 'projects-hub' || route.view === 'project'
                  ? 'text-slate-900 underline underline-offset-4'
                  : ''
              }`}
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => setRoute({ view: 'progress' })}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                route.view === 'progress' ? 'text-slate-900 underline underline-offset-4' : ''
              }`}
            >
              Progress
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => openLesson(nextLesson.stageId, nextLesson.lessonId)}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {totalXp === 0 ? 'Start Learning' : 'Resume Lesson'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Secondary Quick Nav (clean compact strip only on < md screens) */}
      <div className="md:hidden border-b border-slate-200 bg-white px-4 py-2 flex items-center justify-around text-xs font-medium text-slate-600">
        <button
          type="button"
          onClick={() => setRoute({ view: 'roadmap' })}
          className={`whitespace-nowrap ${route.view === 'roadmap' ? 'text-sky-700 font-semibold' : ''}`}
        >
          Roadmap
        </button>
        <button
          type="button"
          onClick={() => openLesson(nextLesson.stageId, nextLesson.lessonId)}
          className={`whitespace-nowrap ${route.view === 'lesson' ? 'text-sky-700 font-semibold' : ''}`}
        >
          Visual Lab
        </button>
        <button
          type="button"
          onClick={() => setRoute({ view: 'projects-hub' })}
          className={`whitespace-nowrap ${
            route.view === 'projects-hub' || route.view === 'project'
              ? 'text-sky-700 font-semibold'
              : ''
          }`}
        >
          Projects
        </button>
        <button
          type="button"
          onClick={() => setRoute({ view: 'progress' })}
          className={`whitespace-nowrap ${route.view === 'progress' ? 'text-sky-700 font-semibold' : ''}`}
        >
          Progress
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {route.view === 'roadmap' && (
          <RoadmapOverview
            stages={STAGES}
            progress={progress}
            totalXp={totalXp}
            completedLessonsCount={completedLessonsCount}
            completedProjectsCount={completedProjectsCount}
            nextLesson={nextLesson}
            onOpenLesson={openLesson}
            onOpenProject={openProject}
          />
        )}

        {route.view === 'lesson' && activeStage && activeLesson && (
          <LessonWorkspace
            stage={activeStage}
            lesson={activeLesson}
            completion={progress.lessons[activeLesson.id] || DEFAULT_COMPLETION}
            hasNextLesson={activeLesson.order < activeStage.lessons.length}
            onBackToRoadmap={() => setRoute({ view: 'roadmap' })}
            onNextLesson={() => {
              const next = activeStage.lessons.find(
                (l) => l.order === activeLesson.order + 1
              );
              if (next) openLesson(activeStage.id, next.id);
            }}
            onOpenStageProject={() => openProject(activeStage.id)}
            onCompleteStep={handleCompleteStep}
          />
        )}

        {route.view === 'project' && activeStage && (
          <ProjectStudio
            stage={activeStage}
            savedCode={progress.savedProjectCode[activeStage.project.id]}
            isCompleted={Boolean(progress.completedProjects[activeStage.project.id])}
            onBackToRoadmap={() => setRoute({ view: 'roadmap' })}
            onSaveCode={handleSaveProjectCode}
            onCompleteProject={handleCompleteProject}
          />
        )}

        {route.view === 'projects-hub' && (
          <ProjectsHub
            stages={STAGES}
            progress={progress}
            onOpenProject={openProject}
          />
        )}

        {route.view === 'progress' && (
          <ProgressView
            stages={STAGES}
            progress={progress}
            totalXp={totalXp}
            maxPossibleXp={maxPossibleXp}
            onOpenLesson={openLesson}
            onOpenProject={openProject}
            onResetProgress={handleResetProgress}
          />
        )}
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span>ClearScript · Visual JavaScript Learning Guide (Beginner to Intermediate)</span>
          <span className="font-mono tabular-nums">
            {totalXp} XP Earned · {completedLessonsCount}/15 Topics · {completedProjectsCount}/5 Projects
          </span>
        </div>
      </footer>

      {/* Subtle XP Toast Notification */}
      {xpNotice && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs font-semibold shadow-lg"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{xpNotice}</span>
        </div>
      )}

      <OfflineIndicator />
    </div>
  );
}
