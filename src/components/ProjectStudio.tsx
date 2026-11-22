import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Code2,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Wrench,
  AlertCircle,
} from 'lucide-react';
import { Stage, XP_VALUES } from '../types/curriculum';
import { buildProjectSrcDoc } from '../utils/codeRunner';

type FileTab = 'js' | 'html' | 'css';

interface ProjectStudioProps {
  stage: Stage;
  savedCode?: { html: string; css: string; js: string };
  isCompleted: boolean;
  onBackToRoadmap: () => void;
  onSaveCode: (projectId: string, code: { html: string; css: string; js: string }) => void;
  onCompleteProject: (projectId: string) => void;
}

export const ProjectStudio: React.FC<ProjectStudioProps> = ({
  stage,
  savedCode,
  isCompleted,
  onBackToRoadmap,
  onSaveCode,
  onCompleteProject,
}) => {
  const project = stage.project;

  const [activeFile, setActiveFile] = useState<FileTab>('js');
  const [html, setHtml] = useState(savedCode?.html ?? project.starterHtml);
  const [css, setCss] = useState(savedCode?.css ?? project.starterCss);
  const [js, setJs] = useState(savedCode?.js ?? project.starterJs);

  const [runVersion, setRunVersion] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState<Array<{ type: 'log' | 'error'; text: string }>>([]);
  const [verifyFeedback, setVerifyFeedback] = useState<string | null>(null);

  useEffect(() => {
    setHtml(savedCode?.html ?? project.starterHtml);
    setCss(savedCode?.css ?? project.starterCss);
    setJs(savedCode?.js ?? project.starterJs);
    setConsoleLogs([]);
    setVerifyFeedback(null);
    setRunVersion((v) => v + 1);
  }, [project.id, savedCode, project.starterHtml, project.starterCss, project.starterJs]);

  // Listen to preview iframe messages
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const data = event.data;
      if (!data || data.source !== 'clearscript-preview' || data.projectId !== project.id) {
        return;
      }
      setConsoleLogs((prev) => [
        ...prev.slice(-14),
        { type: data.type === 'error' ? 'error' : 'log', text: String(data.payload) },
      ]);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [project.id]);

  // Save edits back to parent state
  useEffect(() => {
    onSaveCode(project.id, { html, css, js });
  }, [html, css, js, project.id, onSaveCode]);

  const stepResults = useMemo(() => {
    return project.steps.map((step) => {
      const source =
        step.targetFile === 'html' ? html : step.targetFile === 'css' ? css : js;
      let passed = false;
      try {
        const regex = new RegExp(step.checkPattern, 'i');
        passed = regex.test(source);
      } catch {
        passed = false;
      }
      return { ...step, passed };
    });
  }, [project.steps, html, css, js]);

  const allStepsPassed = stepResults.every((s) => s.passed);

  const srcDoc = useMemo(() => {
    // Re-generate whenever runVersion increments
    void runVersion;
    return buildProjectSrcDoc(html, css, js, project.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runVersion, project.id]);

  const handleRunPreview = () => {
    setConsoleLogs([]);
    setVerifyFeedback(null);
    setRunVersion((v) => v + 1);
  };

  const handleLoadSolution = () => {
    setHtml(project.solutionHtml);
    setCss(project.solutionCss);
    setJs(project.solutionJs);
    setConsoleLogs([]);
    setVerifyFeedback(null);
    setRunVersion((v) => v + 1);
  };

  const handleReset = () => {
    setHtml(project.starterHtml);
    setCss(project.starterCss);
    setJs(project.starterJs);
    setConsoleLogs([]);
    setVerifyFeedback(null);
    setRunVersion((v) => v + 1);
  };

  const handleVerify = () => {
    setRunVersion((v) => v + 1);
    if (allStepsPassed) {
      onCompleteProject(project.id);
      setVerifyFeedback(
        `Awesome work! Your HTML, CSS, and JavaScript all fit together cleanly (+${XP_VALUES.project} XP).`
      );
    } else {
      const remaining = stepResults.filter((s) => !s.passed).map((s) => s.title);
      setVerifyFeedback(`Almost there! Still finish: ${remaining.join(', ')}.`);
    }
  };

  const currentValue = activeFile === 'js' ? js : activeFile === 'html' ? html : css;
  const setCurrentValue = (val: string) => {
    if (activeFile === 'js') setJs(val);
    else if (activeFile === 'html') setHtml(val);
    else setCss(val);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToRoadmap}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Roadmap
        </button>

        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span>Stage 0{stage.number} Capstone</span>
          <span aria-hidden="true">·</span>
          <span>HTML + CSS + JavaScript</span>
          <span aria-hidden="true">·</span>
          <span>+{XP_VALUES.project} XP</span>
        </div>
      </div>

      {/* Intro Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="text-xs font-semibold text-sky-700">
            End-of-Stage Project · {project.whatYouCombine}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 text-balance">
            {project.title}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">{project.summary}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {isCompleted && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mr-2">
              <CheckCircle2 className="w-4 h-4" /> Project Completed (+{XP_VALUES.project} XP)
            </span>
          )}
          <button
            type="button"
            onClick={handleRunPreview}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5" />
            Run Preview
          </button>
          <button
            type="button"
            onClick={handleVerify}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Verify Project (+{XP_VALUES.project} XP)
          </button>
        </div>
      </div>

      {verifyFeedback && (
        <div
          className={`rounded-xl border p-4 text-xs flex items-center gap-2 ${
            allStepsPassed
              ? 'border-emerald-200 bg-emerald-50 text-emerald-950 font-medium'
              : 'border-amber-200 bg-amber-50 text-amber-950'
          }`}
        >
          {allStepsPassed ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          )}
          <span>{verifyFeedback}</span>
        </div>
      )}

      {/* Guided Checklist Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stepResults.map((step, idx) => (
          <div
            key={step.id}
            className={`rounded-xl border p-4 flex items-start gap-3 transition-colors ${
              step.passed
                ? 'border-emerald-300 bg-emerald-50/70'
                : 'border-slate-200 bg-white'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {step.passed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <span className="w-5 h-5 rounded-full border border-slate-300 text-[11px] font-mono flex items-center justify-center text-slate-600">
                  {idx + 1}
                </span>
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">{step.title}</div>
              <div className="text-xs text-slate-600 mt-0.5">{step.instruction}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Split Workspace: Code Editors (Left) + Live Preview & Console (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: HTML / CSS / JS Editor */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-800/80 border-b border-slate-700">
            <div className="flex items-center gap-1">
              {(
                [
                  { id: 'js', label: 'script.js' },
                  { id: 'html', label: 'index.html' },
                  { id: 'css', label: 'styles.css' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFile(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeFile === tab.id
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={handleLoadSolution}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer whitespace-nowrap"
              >
                <Wrench className="w-3.5 h-3.5" />
                Load Solution
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>
          </div>

          <textarea
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            spellCheck={false}
            rows={18}
            aria-label={`${activeFile} code editor`}
            className="code-editor w-full flex-1 bg-slate-900 text-slate-100 p-4 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-none"
          />
        </div>

        {/* Right: Live Browser Preview + Console */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex-1 flex flex-col min-h-[340px]">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 border-b border-slate-200 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-800">
                <Code2 className="w-3.5 h-3.5 text-sky-600" />
                Live Browser Preview
              </span>
              <button
                type="button"
                onClick={handleRunPreview}
                className="text-sky-700 font-semibold hover:underline cursor-pointer"
              >
                Refresh Preview
              </button>
            </div>
            <iframe
              key={runVersion}
              title={project.title}
              srcDoc={srcDoc}
              sandbox="allow-scripts"
              className="w-full flex-1 bg-slate-50 min-h-[300px]"
            />
          </div>

          {/* Mini Console */}
          <div className="bg-slate-900 text-slate-100 rounded-xl border border-slate-800 p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Terminal className="w-3.5 h-3.5" />
              Live Console
            </div>
            {consoleLogs.length === 0 ? (
              <div className="text-xs font-mono text-slate-500">
                No console messages or errors. Interact with your preview above!
              </div>
            ) : (
              <div className="space-y-1 max-h-24 overflow-y-auto font-mono text-xs">
                {consoleLogs.map((entry, idx) => (
                  <div
                    key={idx}
                    className={
                      entry.type === 'error' ? 'text-red-400' : 'text-emerald-300'
                    }
                  >
                    {entry.type === 'error' ? '! ' : '> '}
                    {entry.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
