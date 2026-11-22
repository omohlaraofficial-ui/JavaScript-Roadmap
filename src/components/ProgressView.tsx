import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { Stage, UserProgress, XP_VALUES } from '../types/curriculum';
import { getLevelInfo } from '../data/curriculum';

interface ProgressViewProps {
  stages: Stage[];
  progress: UserProgress;
  totalXp: number;
  maxPossibleXp: number;
  onOpenLesson: (stageId: string, lessonId: string) => void;
  onOpenProject: (stageId: string) => void;
  onResetProgress: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  stages,
  progress,
  totalXp,
  maxPossibleXp,
  onOpenLesson,
  onOpenProject,
  onResetProgress,
}) => {
  const [confirmReset, setConfirmReset] = useState(false);
  const levelInfo = getLevelInfo(totalXp);
  const overallPct = Math.round((totalXp / Math.max(1, maxPossibleXp)) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="text-xs font-medium text-sky-700">
            Level {levelInfo.level} · {levelInfo.title}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Your JavaScript Mastery Progress
          </h1>
          <p className="text-sm text-slate-600">
            Every visual simulation, code gap, debug fix, quiz, and stage project adds permanent XP.
          </p>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <div className="text-3xl font-bold font-mono text-slate-900 tabular-nums">
            {totalXp} / {maxPossibleXp} XP
          </div>
          <div className="text-xs text-slate-500 mt-1 tabular-nums">
            {overallPct}% of complete roadmap earned
          </div>
        </div>
      </div>

      {/* Breakdown by Stage */}
      <div className="space-y-4">
        {stages.map((stage) => {
          const projectDone = Boolean(progress.completedProjects[stage.project.id]);
          const stageLessonXp = stage.lessons.reduce((acc, l) => {
            const c = progress.lessons[l.id];
            if (!c) return acc;
            return (
              acc +
              (c.visualDone ? XP_VALUES.visual : 0) +
              (c.fillGapDone ? XP_VALUES.fillGap : 0) +
              (c.debugDone ? XP_VALUES.debug : 0) +
              (c.quizDone ? XP_VALUES.quiz : 0)
            );
          }, 0);
          const stageTotalXp = stageLessonXp + (projectDone ? XP_VALUES.project : 0);
          const stageMaxXp =
            stage.lessons.length *
              (XP_VALUES.visual + XP_VALUES.fillGap + XP_VALUES.debug + XP_VALUES.quiz) +
            XP_VALUES.project;

          return (
            <div
              key={stage.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-500">
                    Stage 0{stage.number} · {stage.level}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{stage.title}</h2>
                </div>
                <div className="font-mono text-sm font-semibold text-slate-800 tabular-nums">
                  {stageTotalXp} / {stageMaxXp} XP
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {stage.lessons.map((lesson) => {
                  const c = progress.lessons[lesson.id] || {
                    visualDone: false,
                    fillGapDone: false,
                    debugDone: false,
                    quizDone: false,
                  };
                  const doneCount = [
                    c.visualDone,
                    c.fillGapDone,
                    c.debugDone,
                    c.quizDone,
                  ].filter(Boolean).length;

                  return (
                    <button
                      key={lesson.id}
                      type="button"
                      onClick={() => onOpenLesson(stage.id, lesson.id)}
                      className="text-left p-3.5 rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-slate-50 transition-colors cursor-pointer space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-900">
                          {lesson.title}
                        </span>
                        {doneCount === 4 && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 tabular-nums">
                        Visual {c.visualDone ? '✓' : '·'} Gap {c.fillGapDone ? '✓' : '·'} Debug{' '}
                        {c.debugDone ? '✓' : '·'} Quiz {c.quizDone ? '✓' : '·'}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  Capstone Project: <strong>{stage.project.title}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenProject(stage.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:underline cursor-pointer"
                >
                  {projectDone ? 'Completed — Open Studio' : 'Open Project Studio'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset Option */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-slate-900">Start Fresh</div>
          <div className="text-xs text-slate-500">
            Clear your saved XP and project code if you want to restart the roadmap from 0 XP.
          </div>
        </div>

        {!confirmReset ? (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Progress
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onResetProgress();
                setConfirmReset(false);
              }}
              className="px-3.5 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer"
            >
              Confirm Clear All XP
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
