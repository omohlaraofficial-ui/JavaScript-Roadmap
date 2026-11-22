import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Play,
  RotateCcw,
  StepForward,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MousePointerClick,
  Eye,
  EyeOff,
  Clock,
  Package,
} from 'lucide-react';
import { VisualSimulatorId } from '../types/curriculum';

interface VisualSimulatorProps {
  simulatorId: VisualSimulatorId;
  onInteract?: () => void;
}

export const VisualSimulator: React.FC<VisualSimulatorProps> = ({
  simulatorId,
  onInteract,
}) => {
  switch (simulatorId) {
    case 'variables-box':
      return <VariablesBoxSim onInteract={onInteract} />;
    case 'data-types':
      return <DataTypesSim onInteract={onInteract} />;
    case 'template-math':
      return <TemplateMathSim onInteract={onInteract} />;
    case 'conditionals-gate':
      return <ConditionalsGateSim onInteract={onInteract} />;
    case 'logical-switches':
      return <LogicalSwitchesSim onInteract={onInteract} />;
    case 'loop-track':
      return <LoopTrackSim onInteract={onInteract} />;
    case 'function-machine':
      return <FunctionMachineSim onInteract={onInteract} />;
    case 'array-train':
      return <ArrayTrainSim onInteract={onInteract} />;
    case 'object-cabinet':
      return <ObjectCabinetSim onInteract={onInteract} />;
    case 'dom-selector':
      return <DomSelectorSim onInteract={onInteract} />;
    case 'dom-updater':
      return <DomUpdaterSim onInteract={onInteract} />;
    case 'event-wire':
      return <EventWireSim onInteract={onInteract} />;
    case 'scope-rooms':
      return <ScopeRoomsSim onInteract={onInteract} />;
    case 'async-harbor':
      return <AsyncHarborSim onInteract={onInteract} />;
    case 'fetch-json':
      return <FetchJsonSim onInteract={onInteract} />;
  }
};

/* 1. Variables: let vs const */
const VariablesBoxSim: React.FC<{ onInteract?: () => void }> = ({ onInteract }) => {
  const [score, setScore] = useState(10);
  const [constShake, setConstShake] = useState(false);

  const tryChangeConst = () => {
    onInteract?.();
    setConstShake(true);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Open let box */}
        <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-semibold text-sky-800">
              let score
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-sky-700">
              <Unlock className="w-3.5 h-3.5" /> Open Box
            </span>
          </div>
          <div className="bg-white border border-sky-200 rounded-lg py-4 text-center mb-3">
            <div className="text-3xl font-mono font-semibold text-slate-900 tabular-nums">
              {score}
            </div>
            <div className="text-xs text-slate-500 mt-1">Current stored number</div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                onInteract?.();
                setScore((s) => s + 5);
              }}
              className="flex-1 py-2 px-3 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              score = score + 5
            </button>
            <button
              type="button"
              onClick={() => setScore(10)}
              className="py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Reset score"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Locked const box */}
        <div
          className={`rounded-xl border p-4 transition-colors ${
            constShake
              ? 'border-red-300 bg-red-50/70'
              : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-semibold text-slate-800">
              const birthYear
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600">
              <Lock className="w-3.5 h-3.5" /> Padlocked Box
            </span>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg py-4 text-center mb-3">
            <div className="text-3xl font-mono font-semibold text-slate-900 tabular-nums">
              2001
            </div>
            <div className="text-xs text-slate-500 mt-1">Cannot be reassigned</div>
          </div>
          <button
            type="button"
            onClick={tryChangeConst}
            className="w-full py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap"
          >
            Try: birthYear = 2005
          </button>
        </div>
      </div>

      {constShake && (
        <div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-900">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold">TypeError: Assignment to constant variable.</strong>{' '}
            Because <code className="font-mono">birthYear</code> used <code className="font-mono">const</code>, JavaScript locked the label to <code className="font-mono">2001</code>.
          </div>
        </div>
      )}
    </div>
  );
};

/* 2. Data Types */
const DataTypesSim: React.FC<{ onInteract?: () => void }> = ({ onInteract }) => {
  const [leftAsText, setLeftAsText] = useState(true);
  const leftVal = leftAsText ? '"5"' : 5;
  const result = leftAsText ? '"52"' : 7;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="space-y-1">
          <div className="text-xs font-medium text-slate-600">
            Click to toggle the quotes around 5:
          </div>
          <div className="flex items-center gap-2 font-mono text-base">
            <button
              type="button"
              onClick={() => {
                onInteract?.();
                setLeftAsText((v) => !v);
              }}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors cursor-pointer ${
                leftAsText
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-sky-50 border-sky-300 text-sky-900'
              }`}
            >
              {String(leftVal)}
            </button>
            <span className="text-slate-500">+</span>
            <span className="px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-900 font-semibold">
              2
            </span>
            <span className="text-slate-500">=</span>
            <span
              className={`px-3 py-1.5 rounded-lg border font-bold ${
                leftAsText
                  ? 'bg-amber-100 border-amber-300 text-amber-950'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-900'
              }`}
            >
              {String(result)}
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-700 max-w-xs">
          {leftAsText ? (
            <span>
              <strong>String mode:</strong> Quotes turn <code className="font-mono">5</code> into text, so <code className="font-mono">+</code> glues them side by side into <code className="font-mono">"52"</code>.
            </span>
          ) : (
            <span>
              <strong>Number mode:</strong> Without quotes, both are real numbers, so <code className="font-mono">+</code> adds them mathematically to <code className="font-mono">7</code>!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* 3. Template Math */
const TemplateMathSim: React.FC<{ onInteract?: () => void }> = ({ onInteract }) => {
  const [price, setPrice] = useState(12);
  const [qty, setQty] = useState(2);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block rounded-xl border border-slate-200 bg-white p-3.5 text-xs">
          <div className="flex justify-between font-medium text-slate-700 mb-2">
            <span>const price =</span>
            <span className="font-mono font-semibold text-sky-700 tabular-nums">${price}</span>
          </div>
          <input
            type="range"
            min={1}
            max={30}
            value={price}
            onChange={(e) => {
              onInteract?.();
              setPrice(Number(e.target.value));
            }}
            className="w-full accent-sky-600"
          />
        </label>

        <label className="block rounded-xl border border-slate-200 bg-white p-3.5 text-xs">
          <div className="flex justify-between font-medium text-slate-700 mb-2">
            <span>const qty =</span>
            <span className="font-mono font-semibold text-sky-700 tabular-nums">{qty}</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={qty}
            onChange={(e) => {
              onInteract?.();
              setQty(Number(e.target.value));
            }}
            className="w-full accent-sky-600"
          />
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-900 p-4 text-slate-100 space-y-2">
        <div className="font-mono text-xs text-slate-400">Template code:</div>
        <div className="font-mono text-sm">
          <span className="text-amber-300">`Total for </span>
          <span className="bg-sky-500/20 text-sky-300 px-1 rounded">${'{qty}'}</span>
          <span className="text-amber-300"> items: $</span>
          <span className="bg-emerald-500/20 text-emerald-300 px-1 rounded">${'{price * qty}'}</span>
          <span className="text-amber-300">`</span>
        </div>
        <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-sm">
          <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-mono text-emerald-300 tabular-nums">
            "Total for {qty} items: ${price * qty}"
          </span>
        </div>
      </div>
    </div>
  );
};

/* 4. Conditionals Gate */
const ConditionalsGateSim: React.FC<{ onInteract?: () => void }> = ({ onInteract }) => {
  const [temp, setTemp] = useState(28);
  const isHot = temp >= 30;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-slate-700">
            Slide Temperature (<code className="font-mono text-xs">temp</code>):
          </span>
          <span className="font-mono font-bold text-slate-900 tabular-nums">{temp}°C</span>
        </div>
        <input
          type="range"
          min={10}
          max={40}
          value={temp}
          onChange={(e) => {
            onInteract?.();
            setTemp(Number(e.target.value));
          }}
          className="w-full accent-sky-600"
        />
        <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
          <span>Question: <code className="font-mono">temp &gt;= 30</code></span>
          <span className={`font-semibold ${isHot ? 'text-emerald-700' : 'text-amber-700'}`}>
            Answer: {isHot ? 'true (Take IF path)' : 'false (Take ELSE path)'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          className={`rounded-xl border p-4 transition-all ${
            isHot
              ? 'border-emerald-400 bg-emerald-50 text-emerald-950'
              : 'border-slate-200 bg-slate-50 text-slate-400 opacity-60'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold mb-1">
            {isHot ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4" />}
            IF Branch (Active when true)
          </div>
          <code className="font-mono text-xs block">console.log("Wear sunscreen!");</code>
        </div>

        <div
          className={`rounded-xl border p-4 transition-all ${
            !isHot
              ? 'border-sky-400 bg-sky-50 text-sky-950'
              : 'border-slate-200 bg-slate-50 text-slate-400 opacity-60'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold mb-1">
            {!isHot ? <CheckCircle2 className="w-4 h-4 text-sky-600" /> : <XCircle className="w-4 h-4" />}
            ELSE Branch (Active when false)
          </div>
          <code className="font-mono text-xs block">console.log("Light jacket is fine.");</code>
        </div>
      </div>
    </div>
  );
};

/* 5. Logical Switches */
const LogicalSwitchesSim: React.FC<{ onInteract?: () => void }> = ({ onInteract }) => {
  const [hasTicket, setHasTicket] = useState(true);
  const [isVip, setIsVip] = useState(false);

  const andResult = hasTicket && isVip;
  const orResult = hasTicket || isVip;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            onInteract?.();
            setHasTicket((v) => !v);
          }}
          className={`px-4 py-2.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
            hasTicket
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-white border-slate-200 text-slate-600'
          }`}
        >
          hasTicket: {String(hasTicket)} (Click to flip)
        </button>

        <button
          type="button"
          onClick={() => {
            onInteract?.();
            setIsVip((v) => !v);
          }}
          className={`px-4 py-2.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
            isVip
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-white border-slate-200 text-slate-600'
          }`}
        >
          isVip: {String(isVip)} (Click to flip)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          className={`rounded-xl border p-4 ${
            andResult ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="font-mono text-xs font-semibold text-slate-800 mb-1">
            hasTicket && isVip (AND)
          </div>
          <div className="text-xs text-slate-600 mb-2">Needs BOTH to be true</div>
          <div className="text-sm font-bold flex items-center gap-1.5">
            {andResult ? (
              <span className="text-emerald-700 inline-flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> true — Backstage Allowed
              </span>
            ) : (
              <span className="text-slate-600 inline-flex items-center gap-1">
                <XCircle className="w-4 h-4" /> false — Missing at least one
              </span>
            )}
          </div>
        </div>

        <div
          className={`rounded-xl border p-4 ${
            orResult ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="font-mono text-xs font-semibold text-slate-800 mb-1">
            hasTicket || isVip (OR)
          </div>
          <div className="text-xs text-slate-600 mb-2">Needs EITHER one to be true</div>
          <div className="text-sm font-bold flex items-center gap-1.5">
            {orResult ? (
              <span className="text-emerald-700 inline-flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> true — Standard Entry Allowed
              </span>
            ) : (
              <span className="text-slate-600 inline-flex items-center gap-1">
                <XCircle className="w-4 h-4" /> false — Both are false
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* 6. Loop Track */
const LoopTrackSim: React.FC<{ onInteract?: () => void }> = ({ onInteract }) => {
  const [step, setStep] = useState(0); // 0..4 (4 means finished)
  const items = [0, 1, 2, 3].slice(0, step);
  const finished = step >= 4;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <code className="font-mono text-xs bg-slate-100 px-2.5 py-1.5 rounded text-slate-800">
            for (let i = 0; i &lt; 4; i++)
          </code>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={finished}
              onClick={() => {
                onInteract?.();
                setStep((s) => Math.min(4, s + 1));
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <StepForward className="w-3.5 h-3.5" />
              {finished ? 'Loop Done' : `Run Step (i = ${step})`}
            </button>
            <button
              type="button"
              onClick={() => setStep(0)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-1">
          {[0, 1, 2, 3].map((idx) => {
            const done = idx < step;
            const current = idx === step && !finished;
            return (
              <div
                key={idx}
                className={`rounded-lg border p-3 text-center transition-all ${
                  done
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                    : current
                    ? 'border-sky-400 bg-sky-50 text-sky-900'
                    : 'border-slate-200 bg-slate-50 text-slate-400'
                }`}
              >
                <div className="font-mono text-xs font-bold tabular-nums">i = {idx}</div>
                <div className="text-[11px] mt-1">
                  {done ? 'Ran!' : current ? 'Next up' : 'Waiting'}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-xs text-slate-600 flex items-center justify-between pt-1">
          <span>
            Collected output: <code className="font-mono text-slate-900">[{items.join(', ')}]</code>
          </span>
          <span className="font-medium">
            {finished ? 'i reached 4, so 4 < 4 is false → Loop stops!' : `Check: ${step} < 4 is true`}
          </span>
        </div>
      </div>
    </div>
  );
};

/* 7. Function Machine */
const FunctionMachineSim: React.FC<{ onInteract?: () => void }> = ({ onInteract }) => {
  const [inputNum, setInputNum] = useState(5);
  const [outputNum, setOutputNum] = useState<number | null>(10);

  const runMachine = (val: number) => {
    onInteract?.();
    setInputNum(val);
    setOutputNum(val * 2);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-600">Pick an input to drop in:</span>
        {[3, 5, 12, 25].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => runMachine(num)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-colors cursor-pointer ${
              inputNum === num
                ? 'bg-sky-600 border-sky-600 text-white'
                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
            }`}
          >
            doublePrice({num})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <div className="text-xs text-slate-500 mb-1">1. Parameter Input</div>
          <div className="font-mono text-lg font-bold text-sky-700 tabular-nums">
            price = {inputNum}
          </div>
        </div>

        <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-center">
          <div className="text-xs font-semibold text-sky-900 mb-1">2. Inside Machine</div>
          <code className="font-mono text-xs text-sky-800 block">
            return {inputNum} * 2;
          </code>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
          <div className="text-xs text-emerald-800 mb-1">3. Returned Output</div>
          <div className="font-mono text-lg font-bold text-emerald-900 tabular-nums">
            {outputNum}
          </div>
        </div>
      </div>
    </div>
  );
};

/* 8. Array Train */
const ArrayTrainSim: React.FC<{ onInteract?: () => void }> = ({ onInteract }) => {
  const [nums, setNums] = useState([10, 20, 30]);
  const [mode, setMode] = useState<'original' | 'map' | 'filter'>('original');

  const displayed =
    mode === 'map'
      ? nums.map((n) => n * 2)
      : mode === 'filter'
      ? nums.filter((n) => n >= 20)
      : nums;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            onInteract?.();
            setMode('original');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
            mode === 'original'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-200'
          }`}
        >
          Original Array
        </button>
        <button
          type="button"
          onClick={() => {
            onInteract?.();
            setMode('map');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
            mode === 'map'
              ? 'bg-sky-600 text-white border-sky-600'
              : 'bg-white text-slate-700 border-slate-200'
          }`}
        >
          .map(n =&gt; n * 2)
        </button>
        <button
          type="button"
          onClick={() => {
            onInteract?.();
            setMode('filter');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
            mode === 'filter'
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-white text-slate-700 border-slate-200'
          }`}
        >
          .filter(n =&gt; n &gt;= 20)
        </button>
        <button
          type="button"
          onClick={() => {
            onInteract?.();
            setNums((prev) => (prev.length < 5 ? [...prev, (prev.length + 1) * 10] : [10, 20, 30]));
          }}
          className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 cursor-pointer ml-auto"
        >
          {nums.length < 5 ? '+ .push() new car' : 'Reset cars'}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-4">
        {displayed.map((val, idx) => (
          <div
            key={`${idx}-${val}`}
            className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-center min-w-[74px]"
          >
            <div className="text-[11px] font-mono text-slate-500">index [{idx}]</div>
            <div className="font-mono text-base font-bold text-slate-900 tabular-nums mt-0.5">
              {val}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* 9. Object Cabinet */
const ObjectCabinetSim: React.FC<{ onInteract?: () => void }> = ({ onInteract }) => {
  const [selectedKey, setSelectedKey] = useState<'name' | 'xp' | 'isActive'>('name');
  const [xp, setXp] = useState(120);

  const user = {
    name: '"Zara"',
    xp: xp,
    isActive: true,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
      <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
        <div className="text-xs font-medium text-slate-500 px-1">
          Click any drawer key:
        </div>
        {(['name', 'xp', 'isActive'] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => {
              onInteract?.();
              setSelectedKey(k);
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-left font-mono text-xs transition-colors cursor-pointer ${
              selectedKey === k
                ? 'border-sky-500 bg-sky-50 text-sky-950 font-semibold'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>{k}:</span>
            <span className="tabular-nums">{String(user[k])}</span>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-900 text-slate-100 p-4 space-y-3">
        <div className="text-xs text-slate-400">Dot Notation Lookup:</div>
        <div className="font-mono text-sm">
          <span className="text-sky-300">user.{selectedKey}</span>
          <span className="text-slate-400"> → </span>
          <span className="text-emerald-300 font-semibold">{String(user[selectedKey])}</span>
        </div>
        {selectedKey === 'xp' && (
          <button
            type="button"
            onClick={() => {
              onInteract?.();
              setXp((v) => v + 25);
            }}
            className="w-full py-2 px-3 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700 cursor-pointer"
          >
            Run: user.xp = user.xp + 25
          </button>
        )}
      </div>
    </div>
  );
};

/* 10. DOM Selector */
const DomSelectorSim: React.FC<{ onInteract?: () => void }> = ({ onInteract }) => {
  const [selector, setSelector] = useState<'#hero-title' | '.card-note' | '#action-btn'>('#hero-title');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(['#hero-title', '.card-note', '#action-btn'] as const).map((sel) => (
          <button
            key={sel}
            type="button"
            onClick={() => {
              onInteract?.();
              setSelector(sel);
            }}
            className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold transition-colors cursor-pointer ${
              selector === sel
                ? 'bg-sky-600 border-sky-600 text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            querySelector("{sel}")
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-slate-900 text-slate-200 p-4 font-mono text-xs space-y-2">
          <div className="text-slate-400">HTML Tree:</div>
          <div className={`p-2 rounded ${selector === '#hero-title' ? 'bg-sky-500/25 text-sky-200 ring-1 ring-sky-400' : ''}`}>
            &lt;h4 id="hero-title"&gt;Welcome!&lt;/h4&gt;
          </div>
          <div className={`p-2 rounded ${selector === '.card-note' ? 'bg-sky-500/25 text-sky-200 ring-1 ring-sky-400' : ''}`}>
            &lt;p class="card-note"&gt;Learn visually.&lt;/p&gt;
          </div>
          <div className={`p-2 rounded ${selector === '#action-btn' ? 'bg-sky-500/25 text-sky-200 ring-1 ring-sky-400' : ''}`}>
            &lt;button id="action-btn"&gt;Start&lt;/button&gt;
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
          <div className="text-xs font-medium text-slate-500">Live Rendered Page:</div>
          <div
            className={`p-2 rounded border transition-all ${
              selector === '#hero-title' ? 'border-sky-500 bg-sky-50' : 'border-transparent'
            }`}
          >
            <div className="font-bold text-slate-900">Welcome!</div>
          </div>
          <div
            className={`p-2 rounded border transition-all ${
              selector === '.card-note' ? 'border-sky-500 bg-sky-50' : 'border-transparent'
            }`}
          >
            <div className="text-sm text-slate-600">Learn visually.</div>
          </div>
          <div
            className={`inline-block p-1.5 rounded border transition-all ${
              selector === '#action-btn' ? 'border-sky-500 bg-sky-50' : 'border-transparent'
            }`}
          >
            <span className="inline-block px-3 py-1.5 rounded bg-slate-900 text-white text-xs font-semibold">
              Start
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 11. DOM Updater */
const DomUpdaterSim: React.FC<{ onInteract?: () => void }> = ({ onInteract }) => {
  const [saved, setSaved] = useState(false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={() => {
            onInteract?.();
            setSaved((s) => !s);
          }}
          className="w-full py-2.5 px-4 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700 transition-colors cursor-pointer"
        >
          Run: card.classList.toggle("completed")
        </button>
        <div className="rounded-lg bg-slate-900 text-slate-100 p-3 font-mono text-xs space-y-1">
          <div>card.textContent = "{saved ? 'Done!' : 'Pending'}";</div>
          <div>card.classList.contains("completed") → {String(saved)}</div>
        </div>
      </div>

      <div
        className={`rounded-xl border p-5 text-center transition-all ${
          saved
            ? 'border-emerald-400 bg-emerald-50 text-emerald-950'
            : 'border-slate-200 bg-white text-slate-800'
        }`}
      >
        <div className="text-xs font-medium text-slate-500 mb-1">DOM Element Preview</div>
        <div className="text-lg font-bold flex items-center justify-center gap-2">
          {saved && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          {saved ? 'Done!' : 'Pending'}
        </div>
      </div>
    </div>
  );
};

/* 12. Event Wire */
const EventWireSim: React.FC<{ onInteract?: () => void }> = ({ onInteract }) => {
  const [clicks, setClicks] = useState(0);
  const [pulse, setPulse] = useState(false);

  const handleClick = () => {
    onInteract?.();
    setClicks((c) => c + 1);
    setPulse(true);
  };

  useEffect(() => {
    if (!pulse) return;
    const t = setTimeout(() => setPulse(false), 450);
    return () => clearTimeout(t);
  }, [pulse]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
        <button
          type="button"
          onClick={handleClick}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 active:scale-[0.98] transition-all cursor-pointer"
        >
          <MousePointerClick className="w-4 h-4" />
          Click Me!
        </button>

        <div
          className={`rounded-lg border p-3 text-center text-xs font-mono transition-colors ${
            pulse ? 'border-amber-400 bg-amber-50 text-amber-950' : 'border-slate-200 bg-slate-50 text-slate-600'
          }`}
        >
          {pulse ? 'Event signal firing!' : 'Waiting for "click"...'}
        </div>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center">
          <div className="text-xs text-emerald-800">Callback ran:</div>
          <div className="font-mono text-lg font-bold text-emerald-950 tabular-nums">
            {clicks} {clicks === 1 ? 'time' : 'times'}
          </div>
        </div>
      </div>
    </div>
  );
};

/* 13. Scope Rooms */
const ScopeRoomsSim: React.FC<{ onInteract?: () => void }> = ({ onInteract }) => {
  const [perspective, setPerspective] = useState<'inside' | 'outside'>('inside');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            onInteract?.();
            setPerspective('inside');
          }}
          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
            perspective === 'inside'
              ? 'bg-sky-600 border-sky-600 text-white'
              : 'bg-white border-slate-200 text-slate-700'
          }`}
        >
          Look from INSIDE function
        </button>
        <button
          type="button"
          onClick={() => {
            onInteract?.();
            setPerspective('outside');
          }}
          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
            perspective === 'outside'
              ? 'bg-amber-600 border-amber-600 text-white'
              : 'bg-white border-slate-200 text-slate-700'
          }`}
        >
          Look from OUTSIDE (Global)
        </button>
      </div>

      <div className="rounded-xl border border-slate-300 bg-slate-100 p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono font-semibold text-slate-800">
            Global Room: const siteName = "ClearScript"
          </span>
          <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
            <Eye className="w-3.5 h-3.5" /> Visible everywhere
          </span>
        </div>

        <div className="rounded-lg border border-sky-300 bg-white p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-semibold text-sky-900">
              Inside Function Room: const secretPin = 42
            </span>
            {perspective === 'inside' ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                <Eye className="w-3.5 h-3.5" /> Can see BOTH secretPin &amp; siteName
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-red-700 font-medium">
                <EyeOff className="w-3.5 h-3.5" /> Hidden! ReferenceError if read outside
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* 14. Async Harbor */
const AsyncHarborSim: React.FC<{ onInteract?: () => void }> = ({ onInteract }) => {
  const [phase, setPhase] = useState<'idle' | 'waiting' | 'done'>('idle');
  const [logLines, setLogLines] = useState<string[]>([]);

  const startDemo = () => {
    onInteract?.();
    setPhase('waiting');
    setLogLines(['1. Start', '2. Keep moving (runs immediately!)']);
  };

  useEffect(() => {
    if (phase !== 'waiting') return;
    const t = setTimeout(() => {
      setLogLines((prev) => [...prev, '3. Timer finished! (joined from waiting dock)']);
      setPhase('done');
    }, 1100);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={startDemo}
          disabled={phase === 'waiting'}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700 disabled:opacity-60 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5" />
          {phase === 'waiting' ? 'Waiting on timer...' : 'Run Async Demo'}
        </button>
        <span className="inline-flex items-center gap-1 text-xs text-slate-600">
          <Clock className="w-3.5 h-3.5" />
          {phase === 'idle' && 'Ready to trace execution order'}
          {phase === 'waiting' && 'Main track finished; timer is waiting in dock (1.1s)'}
          {phase === 'done' && 'Timer callback completed!'}
        </span>
      </div>

      <div className="rounded-xl bg-slate-900 text-slate-100 p-4 font-mono text-xs space-y-1.5 min-h-[88px]">
        {logLines.length === 0 ? (
          <div className="text-slate-400">Click "Run Async Demo" to watch line 3 wait its turn...</div>
        ) : (
          logLines.map((line, i) => (
            <div key={i} className={i === 2 ? 'text-emerald-300 font-semibold' : 'text-sky-200'}>
              {line}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/* 15. Fetch & JSON */
const FetchJsonSim: React.FC<{ onInteract?: () => void }> = ({ onInteract }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const triggerFetch = (shouldFail: boolean) => {
    onInteract?.();
    setStatus('loading');
    setTimeout(() => {
      setStatus(shouldFail ? 'error' : 'success');
    }, 650);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => triggerFetch(false)}
          disabled={status === 'loading'}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700 disabled:opacity-60 cursor-pointer"
        >
          <Package className="w-3.5 h-3.5" />
          Simulate Successful Fetch
        </button>
        <button
          type="button"
          onClick={() => triggerFetch(true)}
          disabled={status === 'loading'}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 text-xs font-semibold hover:bg-amber-100 disabled:opacity-60 cursor-pointer"
        >
          Simulate Network Error (Test catch)
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs">
        {status === 'idle' && (
          <div className="text-slate-500">Click either button to watch `try / catch` and `await` handle real data.</div>
        )}
        {status === 'loading' && (
          <div className="text-sky-700 font-medium">Awaiting response from server... (`try` block paused here)</div>
        )}
        {status === 'success' && (
          <div className="space-y-1 text-emerald-900">
            <div className="font-semibold">JSON Received &amp; Unpacked:</div>
            <code className="block font-mono bg-emerald-50 border border-emerald-200 p-2 rounded">
              {`{ "city": "Lagos", "tempC": 29 }`} → Rendered safely!
            </code>
          </div>
        )}
        {status === 'error' && (
          <div className="space-y-1 text-amber-900">
            <div className="font-semibold">Caught safely in `catch (err)`:</div>
            <div className="bg-amber-50 border border-amber-200 p-2 rounded">
              App did NOT crash! User sees friendly message: "Offline — please try again."
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
