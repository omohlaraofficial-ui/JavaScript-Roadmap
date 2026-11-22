import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Bug,
  CheckCircle2,
  Code2,
  FolderGit2,
  Play,
} from 'lucide-react';
import { Stage, UserProgress, XP_VALUES } from '../types/curriculum';
import { getLevelInfo } from '../data/curriculum';
import { PWAInstallButton } from './PWAControls';

interface RoadmapOverviewProps {
  stages: Stage[];
  progress: UserProgress;
  totalXp: number;
  completedLessonsCount: number;
  completedProjectsCount: number;
  nextLesson: { stageId: string; lessonId: string; title: string };
  onOpenLesson: (stageId: string, lessonId: string) => void;
  onOpenProject: (stageId: string) => void;
}

export const RoadmapOverview: React.FC<RoadmapOverviewProps> = ({
  stages,
  progress,
  totalXp,
  completedLessonsCount,
  completedProjectsCount,
  nextLesson,
  onOpenLesson,
  onOpenProject,
}) => {
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate'>('all');
  const levelInfo = getLevelInfo(totalXp);

  const visibleStages = stages.filter((s) => {
    if (filter === 'beginner') return s.level === 'Beginner';
    if (filter === 'intermediate')
      return s.level === 'Early Intermediate' || s.level === 'Intermediate';
    return true;
  });

  const getLessonStepsDone = (lessonId: string) => {
    const c = progress.lessons[lessonId];
    if (!c) return 0;
    return [c.visualDone, c.fillGapDone, c.debugDone, c.quizDone].filter(Boolean).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
      {/* Hero Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="text-xs font-medium text-sky-700">
              Beginner to Intermediate · 5 Stages · 15 Interactive Topics
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Learn JavaScript visually, one clear step at a time.
            </h1>
            <p className="text-slate-600 text-base leading-relaxed max-w-xl">
              No dry walls of jargon. Every topic pairs an interactive picture with
              fill-in-the-gap code drills, real bug-fixing challenges, quick quizzes, and an
              HTML + CSS + JavaScript mini-project at the end of every stage.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenLesson(nextLesson.stageId, nextLesson.lessonId)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Play className="w-4 h-4" />
              {totalXp === 0 ? 'Start Stage 1: Variables' : `Resume: ${nextLesson.title}`}
            </button>
            <PWAInstallButton />
            <span className="text-xs text-slate-500">
              Saves progress locally &amp; works offline once cached.
            </span>
          </div>
        </div>

        {/* Visual How-It-Works Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              How every topic builds real skill
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Repeat this 4-step loop to turn confusing concepts into muscle memory:
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <BookOpen className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  1. See It Visually (+{XP_VALUES.visual} XP)
                </div>
                <div className="text-xs text-slate-600">
                  Move sliders, flip switches, and watch memory &amp; loops update live.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <Code2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  2. Fill in the Code Gaps (+{XP_VALUES.fillGap} XP)
                </div>
                <div className="text-xs text-slate-600">
                  Complete missing keywords with clickable tiles or typing.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <Bug className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  3. Debug Broken Code (+{XP_VALUES.debug} XP)
                </div>
                <div className="text-xs text-slate-600">
                  Spot beginner bugs, edit the code, and run live test checks.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <FolderGit2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  4. Stage HTML + CSS + JS Project (+{XP_VALUES.project} XP)
                </div>
                <div className="text-xs text-slate-600">
                  Connect your JavaScript to real HTML &amp; CSS in a live preview.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width 4-Column Progress KPI Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500">Total Knowledge XP</div>
          <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums mt-1">
            {totalXp} XP
          </div>
          <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-600 transition-all"
              style={{ width: `${levelInfo.pct}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500">Current Rank</div>
          <div className="text-lg font-bold text-slate-900 mt-1">
            Level {levelInfo.level} · {levelInfo.title}
          </div>
          <div className="text-xs text-slate-500 mt-1 tabular-nums">
            Next rank at {levelInfo.max} XP
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500">Topics Mastered</div>
          <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums mt-1">
            {completedLessonsCount} / 15
          </div>
          <div className="text-xs text-slate-500 mt-1">
            All 4 practice steps done
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500">HTML + CSS + JS Projects</div>
          <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums mt-1">
            {completedProjectsCount} / 5
          </div>
          <div className="text-xs text-slate-500 mt-1">
            One capstone per stage
          </div>
        </div>
      </section>

      {/* Roadmap Filter Bar */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Your JavaScript Learning Roadmap
            </h2>
            <p className="text-sm text-slate-600">
              Move from Stage 1 to Stage 5 in order, or jump straight to any topic you find tricky.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
            {(
              [
                { id: 'all', label: 'All 5 Stages' },
                { id: 'beginner', label: 'Beginner' },
                { id: 'intermediate', label: 'Intermediate' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stages List */}
        <div className="space-y-8">
          {visibleStages.map((stage) => {
            const projectDone = Boolean(progress.completedProjects[stage.project.id]);
            const lessonsFinishedInStage = stage.lessons.filter(
              (l) => getLessonStepsDone(l.id) === 4
            ).length;

            return (
              <article
                key={stage.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Left Visual Picture Column */}
                  <div className="lg:col-span-4 bg-slate-100 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-200">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                      <img
                        src={stage.visualImage}
                        alt={stage.visualCaption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between gap-3 bg-slate-50">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {stage.visualCaption}
                      </p>
                      <div className="text-xs font-mono text-slate-500 tabular-nums">
                        {lessonsFinishedInStage}/{stage.lessons.length} topics mastered
                        <span className="mx-1.5" aria-hidden="true">·</span>
                        {projectDone ? 'Project built' : 'Project ready'}
                      </div>
                    </div>
                  </div>

                  {/* Right Curriculum Column */}
                  <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between gap-6">
                    <div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mb-1.5">
                        <span className="font-semibold text-sky-700">
                          Stage 0{stage.number}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{stage.level}</span>
                        <span aria-hidden="true">·</span>
                        <span>{stage.lessons.length} Lessons + 1 Mini-Project</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {stage.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">{stage.summary}</p>
                    </div>

                    {/* 3 Topic Rows */}
                    <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                      {stage.lessons.map((lesson) => {
                        const stepsDone = getLessonStepsDone(lesson.id);
                        const isMastered = stepsDone === 4;

                        return (
                          <button
                            key={lesson.id}
                            type="button"
                            onClick={() => onOpenLesson(stage.id, lesson.id)}
                            className="w-full text-left px-4 py-3.5 bg-white hover:bg-slate-50 transition-colors flex flex-wrap items-center justify-between gap-3 cursor-pointer"
                          >
                            <div className="flex items-start gap-3 min-w-0">
                              <div className="mt-0.5 shrink-0">
                                {isMastered ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                ) : (
                                  <span className="w-5 h-5 rounded-full border border-slate-300 text-xs font-mono text-slate-600 flex items-center justify-center">
                                    {lesson.order}
                                  </span>
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-semibold text-slate-900">
                                  {lesson.title}
                                </div>
                                <div className="text-xs text-slate-500 truncate">
                                  {lesson.subtitle}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 ml-auto">
                              <span className="text-xs font-mono text-slate-500 tabular-nums">
                                {stepsDone}/4 steps
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700">
                                Open
                                <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* End of Stage HTML + CSS + JS Project Row */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold text-slate-900 flex items-center gap-2">
                          <FolderGit2 className="w-4 h-4 text-sky-600" />
                          <span>{stage.project.title}</span>
                        </div>
                        <div className="text-xs text-slate-600">
                          Combines: {stage.project.whatYouCombine}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenProject(stage.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                          projectDone
                            ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        {projectDone ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Review Project (+{XP_VALUES.project} XP)
                          </>
                        ) : (
                          <>
                            Build Stage Project (+{XP_VALUES.project} XP)
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
