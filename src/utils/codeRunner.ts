export interface DebugRunResult {
  passed: boolean;
  logs: string[];
  errorMessage: string | null;
  friendlyHint: string | null;
  details: string;
}

function formatFriendlyError(err: unknown): { raw: string; friendly: string } {
  const raw = err instanceof Error ? `${err.name}: ${err.message}` : String(err);

  if (raw.includes('Assignment to constant variable')) {
    return {
      raw,
      friendly:
        'You tried to change a `const` variable! `const` boxes are sealed—use `let` if the value needs to change later.',
    };
  }
  if (raw.includes('is not defined')) {
    const match = raw.match(/(\w+) is not defined/);
    const name = match ? match[1] : 'that variable';
    return {
      raw,
      friendly: `JavaScript cannot find "${name}". Check the spelling or make sure it was declared inside the right scope.`,
    };
  }
  if (raw.includes('Unexpected token') || raw.includes('SyntaxError')) {
    return {
      raw,
      friendly:
        'There is a small typo in the punctuation (like a missing bracket, quote, or parenthesis). Look closely at the highlighted area.',
    };
  }
  if (raw.includes('is not a function')) {
    return {
      raw,
      friendly:
        'You tried to call something with `()` that is not a function. Double-check the method name or variable type.',
    };
  }

  return {
    raw,
    friendly: 'Check what value your code actually produces compared to what the test expects.',
  };
}

export function runDebugCode(userCode: string, assertionScript: string): DebugRunResult {
  const logs: string[] = [];

  const mockConsole = {
    log: (...args: unknown[]) => {
      const line = args
        .map((arg) => {
          if (typeof arg === 'string') return arg;
          try {
            return JSON.stringify(arg);
          } catch {
            return String(arg);
          }
        })
        .join(' ');
      logs.push(line);
    },
  };

  try {
    const combined = `
      "use strict";
      ${userCode}
      ;
      ${assertionScript}
    `;
    const fn = new Function('console', '__logs', combined);
    const result = fn(mockConsole, logs) as { ok: boolean; message: string } | undefined;

    if (result && result.ok) {
      return {
        passed: true,
        logs,
        errorMessage: null,
        friendlyHint: null,
        details: result.message || 'All checks passed!',
      };
    }

    return {
      passed: false,
      logs,
      errorMessage: null,
      friendlyHint: result?.message || 'Output did not match what was expected yet.',
      details: result?.message || 'Keep adjusting the code and run the test again.',
    };
  } catch (err) {
    const { raw, friendly } = formatFriendlyError(err);
    return {
      passed: false,
      logs,
      errorMessage: raw,
      friendlyHint: friendly,
      details: raw,
    };
  }
}

export function buildProjectSrcDoc(html: string, css: string, js: string, projectId: string): string {
  const safeJs = js.replace(/<\/script>/gi, '<\\/script>');
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      *, *::before, *::after { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #0f172a;
        background: #f8fafc;
        line-height: 1.5;
      }
      ${css}
    </style>
  </head>
  <body>
    ${html}
    <script>
      (function() {
        const post = (type, payload) => {
          window.parent.postMessage({ source: 'clearscript-preview', projectId: ${JSON.stringify(projectId)}, type, payload }, '*');
        };
        const origLog = console.log;
        console.log = function(...args) {
          origLog.apply(console, args);
          post('log', args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
        };
        window.onerror = function(msg, url, line) {
          post('error', String(msg) + (line ? ' (line ' + line + ')' : ''));
          return false;
        };
        try {
          ${safeJs}
        } catch (err) {
          post('error', err && err.message ? err.message : String(err));
        }
      })();
    </script>
  </body>
</html>`;
}
