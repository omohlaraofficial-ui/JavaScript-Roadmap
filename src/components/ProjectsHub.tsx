import React from 'react';
import { ArrowRight, CheckCircle2, Code2 } from 'lucide-react';
import { Stage, UserProgress, XP_VALUES } from '../types/curriculum';

interface ProjectsHubProps {
  stages: Stage[];
  progress: UserProgress;
  onOpenProject: (stageId: string) => void;
}

export const ProjectsHub: React.FC<ProjectsHubProps> = ({
  stages,
  progress,
  onOpenProject,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <div className="max-w-2xl space-y-2">
        <div className="text-xs font-medium text-sky-700">
          5 End-of-Stage Capstones · HTML + CSS + JavaScript
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Stage Mini-Projects
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Every stage ends with a real webpage widget combining HTML structure, CSS styling,
          and JavaScript behavior in a live browser preview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stages.map((stage) => {
          const isDone = Boolean(progress.completedProjects[stage.project.id]);
          return (
            <div
              key={stage.project.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden border-b border-slate-200">
                  <img
                    src={stage.visualImage}
                    alt={stage.project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="font-semibold text-sky-700">
                      Stage 0{stage.number}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>+{XP_VALUES.project} XP</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {stage.project.title}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stage.project.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-slate-500 inline-flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-slate-400" />
                  HTML · CSS · JS
                </span>
                <button
                  type="button"
                  onClick={() => onOpenProject(stage.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    isDone
                      ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </>
                  ) : (
                    <>
                      Open Studio
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
