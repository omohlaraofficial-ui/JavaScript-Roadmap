import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bug,
  CheckCircle2,
  Code2,
  HelpCircle,
  Lightbulb,
  Play,
  RotateCcw,
  Wrench,
  AlertCircle,
} from 'lucide-react';
import { Lesson, LessonCompletion, Stage, XP_VALUES } from '../types/curriculum';
import { VisualSimulator } from './VisualSimulators';
import { runDebugCode, DebugRunResult } from '../utils/codeRunner';

type LessonTab = 'visual' | 'fill-gap' | 'debug' | 'quiz';

interface LessonWorkspaceProps {
  stage: Stage;
  lesson: Lesson;
  completion: LessonCompletion;
  hasNextLesson: boolean;
  onBackToRoadmap: () => void;
  onNextLesson: () => void;
  onOpenStageProject: () => void;
  onCompleteStep: (
    lessonId: string,
    step: 'visualDone' | 'fillGapDone' | 'debugDone' | 'quizDone',
    xp: number
  ) => void;
}

export const LessonWorkspace: React.FC<LessonWorkspaceProps> = ({
  stage,
  lesson,
  completion,
  hasNextLesson,
  onBackToRoadmap,
  onNextLesson,
  onOpenStageProject,
  onCompleteStep,
}) => {
  const [activeTab, setActiveTab] = useState<LessonTab>('visual');

  // Fill-the-Gap state
  const [blankValues, setBlankValues] = useState<Record<string, string>>({});
  const [activeBlankId, setActiveBlankId] = useState<string | null>(null);
  const [fillResult, setFillResult] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showFillHint, setShowFillHint] = useState(false);

  // Debug state
  const [debugCode, setDebugCode] = useState(lesson.debug.buggyCode);
  const [debugResult, setDebugResult] = useState<DebugRunResult | null>(null);
  const [showDebugClue, setShowDebugClue] = useState(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  // Reset local interactive state when switching lessons
  useEffect(() => {
    setActiveTab('visual');
    setBlankValues({});
    const firstBlank = lesson.fillGap.lines
      .flat()
      .find((seg) => seg.type === 'blank' && seg.blankId)?.blankId;
    setActiveBlankId(firstBlank || null);
    setFillResult('idle');
    setShowFillHint(false);
    setDebugCode(lesson.debug.buggyCode);
    setDebugResult(null);
    setShowDebugClue(false);
    setSelectedAnswers({});
  }, [lesson.id, lesson.debug.buggyCode, lesson.fillGap.lines]);

  const allBlankIds = lesson.fillGap.lines
    .flat()
    .filter((s) => s.type === 'blank' && s.blankId)
    .map((s) => s.blankId as string);

  const handleWordBankPick = (word: string) => {
    const target =
      activeBlankId ||
      allBlankIds.find((id) => !blankValues[id]) ||
      allBlankIds[0];
    if (!target) return;

    const updated = { ...blankValues, [target]: word };
    setBlankValues(updated);
    setFillResult('idle');

    // Move focus to the next empty blank automatically
    const nextEmpty = allBlankIds.find((id) => id !== target && !updated[id]);
    if (nextEmpty) setActiveBlankId(nextEmpty);
  };

  const checkFillGap = () => {
    const isAllRight = allBlankIds.every(
      (id) => (blankValues[id] || '').trim() === lesson.fillGap.answers[id]
    );
    if (isAllRight) {
      setFillResult('correct');
      onCompleteStep(lesson.id, 'fillGapDone', XP_VALUES.fillGap);
    } else {
      setFillResult('wrong');
    }
  };

  const handleRunDebug = () => {
    const res = runDebugCode(debugCode, lesson.debug.assertionScript);
    setDebugResult(res);
    if (res.passed) {
      onCompleteStep(lesson.id, 'debugDone', XP_VALUES.debug);
    }
  };

  const handleQuizOption = (questionId: string, optionIdx: number) => {
    const next = { ...selectedAnswers, [questionId]: optionIdx };
    setSelectedAnswers(next);

    const allCorrect = lesson.quiz.every((q) => next[q.id] === q.correctIndex);
    if (allCorrect) {
      onCompleteStep(lesson.id, 'quizDone', XP_VALUES.quiz);
    }
  };

  const tabs: {
    id: LessonTab;
    label: string;
    xp: number;
    done: boolean;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'visual',
      label: '1. Visual Guide',
      xp: XP_VALUES.visual,
      done: completion.visualDone,
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'fill-gap',
      label: '2. Fill the Gap',
      xp: XP_VALUES.fillGap,
      done: completion.fillGapDone,
      icon: <Code2 className="w-4 h-4" />,
    },
    {
      id: 'debug',
      label: '3. Debug Code',
      xp: XP_VALUES.debug,
      done: completion.debugDone,
      icon: <Bug className="w-4 h-4" />,
    },
    {
      id: 'quiz',
      label: '4. Quick Quiz',
      xp: XP_VALUES.quiz,
      done: completion.quizDone,
      icon: <HelpCircle className="w-4 h-4" />,
    },
  ];

  const completedStepsCount = [
    completion.visualDone,
    completion.fillGapDone,
    completion.debugDone,
    completion.quizDone,
  ].filter(Boolean).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Breadcrumb & Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToRoadmap}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Roadmap
        </button>

        <div className="text-xs text-slate-500 flex items-center gap-2 tabular-nums">
          <span>Stage 0{stage.number}: {stage.title}</span>
          <span aria-hidden="true">·</span>
          <span>Lesson {lesson.order} of {stage.lessons.length}</span>
          <span aria-hidden="true">·</span>
          <span>{completedStepsCount}/4 steps completed</span>
        </div>
      </div>

      {/* Lesson Title Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="text-xs font-medium text-sky-700 mb-2">
          Stage {stage.number} · {stage.level} · {lesson.estimatedMinutes} min
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
          {lesson.title}
        </h1>
        <p className="text-slate-600 mt-1.5 text-base">{lesson.subtitle}</p>

        {/* Segmented Mode Tabs */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 bg-slate-100 rounded-xl">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="inline-flex items-center gap-2 truncate">
                  {tab.icon}
                  <span className="truncate">{tab.label}</span>
                </span>
                {tab.done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <span className="font-mono text-[11px] text-slate-400 tabular-nums shrink-0">
                    +{tab.xp}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: VISUAL GUIDE */}
      {activeTab === 'visual' && (
        <div className="space-y-6">
          {/* Interactive Visual Sandbox */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Interactive Visual Lab
                </h2>
                <p className="text-sm text-slate-600">
                  Play with the controls below to see how JavaScript works behind the scenes.
                </p>
              </div>
              {completion.visualDone && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" /> Visual Explored (+{XP_VALUES.visual} XP)
                </span>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
              <VisualSimulator
                simulatorId={lesson.simulatorId}
                onInteract={() => {
                  if (!completion.visualDone) {
                    onCompleteStep(lesson.id, 'visualDone', XP_VALUES.visual);
                  }
                }}
              />
            </div>

            {!completion.visualDone && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    onCompleteStep(lesson.id, 'visualDone', XP_VALUES.visual)
                  }
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Got It — Collect +{XP_VALUES.visual} XP
                </button>
              </div>
            )}
          </div>

          {/* Plain-English Breakdown + Stage Picture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                  In Plain English
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {lesson.plainEnglish}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                  Real-Life Picture
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {lesson.realLifeAnalogy}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-semibold text-amber-800 mb-1.5 inline-flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Watch Out For
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {lesson.watchOutFor}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="text-xs font-medium text-slate-500 mb-2">
                  Clean Code Pattern:
                </div>
                <pre className="rounded-xl bg-slate-900 text-slate-100 p-4 text-xs font-mono overflow-x-auto leading-relaxed">
                  <code>{lesson.codeExample}</code>
                </pre>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col">
              <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                <img
                  src={stage.visualImage}
                  alt={stage.visualCaption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-slate-900 mb-1">
                    Stage {stage.number} Visual Metaphor
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stage.visualCaption}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('fill-gap')}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Next: Practice Fill the Gap
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FILL IN THE GAP */}
      {activeTab === 'fill-gap' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Fill in the Code Gaps</h2>
              <p className="text-sm text-slate-600 mt-0.5">{lesson.fillGap.prompt}</p>
            </div>
            {completion.fillGapDone && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" /> Solved (+{XP_VALUES.fillGap} XP)
              </span>
            )}
          </div>

          {/* Code lines with interactive blanks */}
          <div className="rounded-xl bg-slate-900 text-slate-100 p-5 font-mono text-sm space-y-2.5 overflow-x-auto">
            {lesson.fillGap.lines.map((segments, lineIdx) => (
              <div key={lineIdx} className="flex flex-wrap items-center gap-1 leading-8 whitespace-pre">
                <span className="w-6 text-slate-500 text-xs select-none tabular-nums">
                  {lineIdx + 1}
                </span>
                {segments.map((seg, segIdx) => {
                  if (seg.type === 'text') {
                    return <span key={segIdx}>{seg.value}</span>;
                  }
                  const bId = seg.blankId || '';
                  const val = blankValues[bId] || '';
                  const isFocused = activeBlankId === bId;
                  return (
                    <input
                      key={bId}
                      type="text"
                      value={val}
                      onFocus={() => setActiveBlankId(bId)}
                      onChange={(e) => {
                        setBlankValues((prev) => ({ ...prev, [bId]: e.target.value }));
                        setFillResult('idle');
                      }}
                      placeholder="____"
                      aria-label={`Code blank ${bId}`}
                      style={{ width: `${Math.max(6, (val.length || 5) + 2)}ch` }}
                      className={`inline-block px-2 py-0.5 rounded border text-center font-mono text-sm transition-colors focus:outline-none ${
                        fillResult === 'correct'
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-200'
                          : isFocused
                          ? 'bg-sky-950 border-sky-400 text-white'
                          : 'bg-slate-800 border-slate-600 text-sky-200'
                      }`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Word Bank */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-slate-600">
              Click a tile to place it into the selected blank (or type directly):
            </div>
            <div className="flex flex-wrap gap-2">
              {lesson.fillGap.wordBank.map((word, idx) => (
                <button
                  key={`${word}-${idx}`}
                  type="button"
                  onClick={() => handleWordBankPick(word)}
                  className="px-3.5 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 font-mono text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={checkFillGap}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              Check Answer
            </button>
            <button
              type="button"
              onClick={() => setShowFillHint((v) => !v)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              {showFillHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            <button
              type="button"
              onClick={() => {
                setBlankValues({});
                setFillResult('idle');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-800 text-xs font-medium cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear Blanks
            </button>
          </div>

          {showFillHint && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-950">
              <strong>Hint:</strong> {lesson.fillGap.hint}
            </div>
          )}

          {fillResult === 'correct' && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-emerald-900 inline-flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Perfect! Every blank is right.
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('debug')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 cursor-pointer"
                >
                  Next: Debug Code
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-emerald-900">{lesson.fillGap.explanation}</p>
            </div>
          )}

          {fillResult === 'wrong' && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-900">
              Not quite yet! Double-check each blank or click <strong>Show Hint</strong> for a clue.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DEBUG THE CODE */}
      {activeTab === 'debug' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Debug &amp; Fix the Code</h2>
              <p className="text-sm text-slate-600 mt-0.5">{lesson.debug.prompt}</p>
            </div>
            {completion.debugDone && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" /> Bug Fixed (+{XP_VALUES.debug} XP)
              </span>
            )}
          </div>

          {/* Bug Symptom & Goal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-red-200 bg-red-50/70 p-3.5">
              <div className="font-semibold text-red-900 mb-1">Current Bug Symptom:</div>
              <div className="font-mono text-red-800">{lesson.debug.symptom}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
              <div className="font-semibold text-slate-900 mb-1">Goal to Pass:</div>
              <div className="text-slate-700">{lesson.debug.testDescription}</div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="rounded-xl overflow-hidden border border-slate-300 bg-slate-900">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 text-xs text-slate-300">
              <span className="font-mono">script.js (Edit directly below)</span>
              <button
                type="button"
                onClick={() => {
                  setDebugCode(lesson.debug.buggyCode);
                  setDebugResult(null);
                }}
                className="inline-flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Buggy Code
              </button>
            </div>
            <textarea
              value={debugCode}
              onChange={(e) => setDebugCode(e.target.value)}
              spellCheck={false}
              rows={8}
              aria-label="Debug JavaScript code editor"
              className="code-editor w-full bg-slate-900 text-slate-100 p-4 font-mono text-sm leading-relaxed focus:outline-none resize-y"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleRunDebug}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition-colors cursor-pointer"
            >
              <Play className="w-4 h-4" />
              Run &amp; Test Code
            </button>
            <button
              type="button"
              onClick={() => setShowDebugClue((v) => !v)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              {showDebugClue ? 'Hide Clue' : 'Give Me a Clue'}
            </button>
            <button
              type="button"
              onClick={() => {
                setDebugCode(lesson.debug.solutionCode);
                setDebugResult(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-900 text-xs font-medium cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5" />
              Show Fixed Version
            </button>
          </div>

          {showDebugClue && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-950">
              <strong>Clue:</strong> {lesson.debug.clue}
            </div>
          )}

          {debugResult && (
            <div
              className={`rounded-xl border p-4 space-y-2 ${
                debugResult.passed
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                  : 'border-red-200 bg-red-50 text-red-950'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-bold inline-flex items-center gap-2">
                  {debugResult.passed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Test Passed!
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      Not Passing Yet
                    </>
                  )}
                </span>
                {debugResult.passed && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('quiz')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 cursor-pointer"
                  >
                    Next: Quick Quiz
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <p className="text-xs">{debugResult.friendlyHint || debugResult.details}</p>

              {debugResult.logs.length > 0 && (
                <div className="mt-2 rounded-lg bg-slate-900 text-slate-100 p-3 font-mono text-xs">
                  <div className="text-slate-400 mb-1">Console Output:</div>
                  {debugResult.logs.map((line, i) => (
                    <div key={i}>&gt; {line}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: QUICK QUIZ */}
      {activeTab === 'quiz' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Quick Knowledge Check</h2>
              <p className="text-sm text-slate-600">
                Answer both questions correctly to earn +{XP_VALUES.quiz} XP.
              </p>
            </div>
            {completion.quizDone && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" /> Quiz Complete (+{XP_VALUES.quiz} XP)
              </span>
            )}
          </div>

          <div className="space-y-6">
            {lesson.quiz.map((q, qIdx) => {
              const chosen = selectedAnswers[q.id];
              const isAnswered = chosen !== undefined;
              const isCorrect = chosen === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 space-y-3"
                >
                  <div className="text-sm font-semibold text-slate-900">
                    Question {qIdx + 1}: {q.question}
                  </div>
                  {q.codeSnippet && (
                    <pre className="rounded-lg bg-slate-900 text-slate-100 p-3 font-mono text-xs overflow-x-auto">
                      <code>{q.codeSnippet}</code>
                    </pre>
                  )}

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = chosen === optIdx;
                      const showRight = isSelected && isCorrect;
                      const showWrong = isSelected && !isCorrect;

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleQuizOption(q.id, optIdx)}
                          className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                            showRight
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                              : showWrong
                              ? 'bg-red-50 border-red-300 text-red-950'
                              : 'bg-white border-slate-200 text-slate-800 hover:border-sky-300 hover:bg-sky-50/40'
                          }`}
                        >
                          <span>{opt}</span>
                          {showRight && (
                            <span className="text-xs font-semibold text-emerald-700 shrink-0">
                              Correct
                            </span>
                          )}
                          {showWrong && (
                            <span className="text-xs font-semibold text-red-700 shrink-0">
                              Try again
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div
                      className={`text-xs rounded-lg p-3 ${
                        isCorrect
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                          : 'bg-amber-50 text-amber-900 border border-amber-200'
                      }`}
                    >
                      {isCorrect ? q.explanation : 'Not quite—read the choices carefully and pick another option!'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Lesson Footer Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={onBackToRoadmap}
          className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 cursor-pointer"
        >
          All Roadmap Stages
        </button>

        {hasNextLesson ? (
          <button
            type="button"
            onClick={onNextLesson}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Next Lesson in Stage {stage.number}
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onOpenStageProject}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition-colors cursor-pointer"
          >
            Build Stage {stage.number} HTML + CSS + JS Project
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
