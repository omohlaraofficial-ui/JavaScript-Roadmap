import { Stage } from '../types/curriculum';

export const STAGES: Stage[] = [
  {
    id: 'stage-1',
    number: 1,
    title: 'The Building Blocks',
    level: 'Beginner',
    summary:
      'Learn how JavaScript stores information in labeled boxes, tells text apart from numbers, and combines values cleanly.',
    visualImage: '/src/assets/images/stage_1_boxes_1795383140113.jpg',
    visualCaption:
      'Think of variables as labeled containers on a desk: some stay open for updates (let), and some stay padlocked (const).',
    lessons: [
      {
        id: 's1-l1',
        stageId: 'stage-1',
        order: 1,
        title: 'Variables: let vs const',
        subtitle: 'Giving names to values so your code remembers them',
        estimatedMinutes: 5,
        simulatorId: 'variables-box',
        plainEnglish:
          'A variable is simply a labeled storage box in your computer’s memory. Use `const` when the label should never be reassigned to a new value, and `let` when you plan to update what is inside later.',
        realLifeAnalogy:
          'Your birth year belongs in a padlocked `const` box because it never changes. Your current game score belongs in an open `let` box because it goes up every round.',
        watchOutFor:
          'Trying to reassign a `const` variable causes a TypeError. Start with `const` by default, and switch to `let` only when a value genuinely needs to change.',
        codeExample: `const birthYear = 2001;
let score = 10;

score = 25; // Works because score used "let"
console.log(score); // 25`,
        fillGap: {
          prompt: 'Create a constant site name that stays fixed, and a counter variable that updates from 1 to 2.',
          lines: [
            [
              { type: 'blank', value: '', blankId: 'b1' },
              { type: 'text', value: ' appName = "ClearScript";' },
            ],
            [
              { type: 'blank', value: '', blankId: 'b2' },
              { type: 'text', value: ' streak = 1;' },
            ],
            [
              { type: 'text', value: 'streak = ' },
              { type: 'blank', value: '', blankId: 'b3' },
              { type: 'text', value: ';' },
            ],
          ],
          answers: {
            b1: 'const',
            b2: 'let',
            b3: '2',
          },
          wordBank: ['const', 'let', '2', 'var', 'true'],
          hint: 'Fixed values use `const`. Values that get reassigned later need `let`.',
          explanation:
            '`appName` never changes, so `const` keeps it safe. `streak` changes from `1` to `2`, so it must be declared with `let`.',
        },
        debug: {
          prompt: 'This shopping total crashes when adding delivery fees. Fix the declaration so `total` can be updated.',
          symptom: 'TypeError: Assignment to constant variable.',
          buggyCode: `const total = 40;
const deliveryFee = 5;

total = total + deliveryFee;
console.log(total);`,
          solutionCode: `let total = 40;
const deliveryFee = 5;

total = total + deliveryFee;
console.log(total);`,
          clue: 'Look at line 1: `total` is reassigned on line 4, so it cannot be `const`.',
          testDescription: 'Code runs without error and logs 45.',
          assertionScript: `
            if (typeof total === 'undefined') return { ok: false, message: 'Keep the variable named total.' };
            if (total !== 45) return { ok: false, message: 'Expected total to equal 45, got ' + total };
            if (__logs[0] !== '45') return { ok: false, message: 'Make sure console.log(total) prints 45.' };
            return { ok: true, message: 'Nice fix! Using let allows total to update cleanly to 45.' };
          `,
        },
        quiz: [
          {
            id: 's1-l1-q1',
            question: 'Which keyword should you use for a user’s current cart count that goes up and down?',
            options: ['let', 'const', 'fixed', 'box'],
            correctIndex: 0,
            explanation: '`let` creates a variable whose value you can update later as items are added or removed.',
          },
          {
            id: 's1-l1-q2',
            question: 'What happens if you run this code?',
            codeSnippet: `const city = "Lagos";\ncity = "Abuja";`,
            options: [
              'It prints "Abuja"',
              'JavaScript throws a TypeError because city is const',
              'city becomes empty',
            ],
            correctIndex: 1,
            explanation: '`const` prevents reassigning the box to a new value, so JavaScript stops and reports a TypeError.',
          },
        ],
      },
      {
        id: 's1-l2',
        stageId: 'stage-1',
        order: 2,
        title: 'Data Types: Strings, Numbers & Booleans',
        subtitle: 'Why quotes matter more than you think',
        estimatedMinutes: 6,
        simulatorId: 'data-types',
        plainEnglish:
          'Every value in JavaScript has a type. Words inside quotes are Strings (`"hello"`), plain digits without quotes are Numbers (`42`), and yes/no switches are Booleans (`true` or `false`).',
        realLifeAnalogy:
          'Writing `"5"` in quotes is like writing the word "five" on paper—you cannot do math with paper words until you turn them into real numbers.',
        watchOutFor:
          'When you use `+` with a String and a Number (like `"5" + 2`), JavaScript glues them together into `"52"` instead of adding them to `7`!',
        codeExample: `const greeting = "Hello"; // String (text)
const age = 24;           // Number (math-ready)
const isLoggedIn = true;  // Boolean (yes/no switch)`,
        fillGap: {
          prompt: 'Complete the profile values with the right JavaScript types: a String name, a Number age, and a Boolean.',
          lines: [
            [
              { type: 'text', value: 'const learnerName = ' },
              { type: 'blank', value: '', blankId: 'b1' },
              { type: 'text', value: ';' },
            ],
            [
              { type: 'text', value: 'const lessonsDone = ' },
              { type: 'blank', value: '', blankId: 'b2' },
              { type: 'text', value: ';' },
            ],
            [
              { type: 'text', value: 'const isReady = ' },
              { type: 'blank', value: '', blankId: 'b3' },
              { type: 'text', value: ';' },
            ],
          ],
          answers: {
            b1: '"Maya"',
            b2: '3',
            b3: 'true',
          },
          wordBank: ['"Maya"', '3', 'true', '"3"', 'Maya'],
          hint: 'Text must wear quotes (`"Maya"`). Numbers and booleans (`true`) do NOT wear quotes.',
          explanation:
            'Quotes turn digits or booleans into plain text strings. Leaving quotes off keeps `3` as a Number and `true` as a Boolean.',
        },
        debug: {
          prompt: 'This calculator was supposed to add two prices (`15 + 10 = 25`), but it outputs `"1510"`. Fix the bug!',
          symptom: 'Logged "1510" instead of 25.',
          buggyCode: `const shirtPrice = "15";
const hatPrice = 10;

const total = shirtPrice + hatPrice;
console.log(total);`,
          solutionCode: `const shirtPrice = 15;
const hatPrice = 10;

const total = shirtPrice + hatPrice;
console.log(total);`,
          clue: 'Look closely at `"15"` on line 1—quotes turned the number into text!',
          testDescription: 'total equals the number 25 and logs 25.',
          assertionScript: `
            if (typeof shirtPrice !== 'number') return { ok: false, message: 'shirtPrice is still a ' + typeof shirtPrice + '. Remove the quotes so it is a number.' };
            if (total !== 25) return { ok: false, message: 'Expected total to be 25, got ' + total };
            return { ok: true, message: 'Spot on! Removing the quotes turned "15" into the number 15 so math works.' };
          `,
        },
        quiz: [
          {
            id: 's1-l2-q1',
            question: 'What does `"10" + 5` produce in JavaScript?',
            options: ['15', '"105"', 'Error'],
            correctIndex: 1,
            explanation: 'Because `"10"` is a String inside quotes, `+` joins them together as text: `"105"`.',
          },
          {
            id: 's1-l2-q2',
            question: 'Which value is a true Boolean?',
            options: ['"true"', 'false', '"no"'],
            correctIndex: 1,
            explanation: '`false` (without quotes) is one of the two Boolean values (`true` and `false`).',
          },
        ],
      },
      {
        id: 's1-l3',
        stageId: 'stage-1',
        order: 3,
        title: 'Math & Template Strings',
        subtitle: 'Building clean messages with backticks `${ }`',
        estimatedMinutes: 5,
        simulatorId: 'template-math',
        plainEnglish:
          'Instead of gluing strings together with messy `+` signs and spaces, wrap your text in backticks (`` ` ``) and drop variables straight inside `${ }` placeholders.',
        realLifeAnalogy:
          'A template string is like a fill-in-the-blank greeting card: "Hello ____, your total is $____." JavaScript fills in the blanks for you.',
        watchOutFor:
          'Remember to use backticks `` ` `` (top-left key near `1`), NOT regular single quotes `\'` or double quotes `"`, otherwise `${name}` prints literally!',
        codeExample: `const item = "Coffee";
const price = 4;
const qty = 3;

const receipt = \`You bought \${qty} \${item}s for $\${price * qty}\`;
console.log(receipt);`,
        fillGap: {
          prompt: 'Build a clean welcome message using template string syntax.',
          lines: [
            [{ type: 'text', value: 'const user = "Sam";' }],
            [{ type: 'text', value: 'const points = 50;' }],
            [
              { type: 'text', value: 'const msg = ' },
              { type: 'blank', value: '', blankId: 'b1' },
              { type: 'text', value: 'Hi ' },
              { type: 'blank', value: '', blankId: 'b2' },
              { type: 'text', value: ', you have ' },
              { type: 'blank', value: '', blankId: 'b3' },
              { type: 'text', value: ' XP`' },
              { type: 'text', value: ';' },
            ],
          ],
          answers: {
            b1: '`',
            b2: '${user}',
            b3: '${points}',
          },
          wordBank: ['`', '${user}', '${points}', "'", '{user}'],
          hint: 'Template strings start with a backtick `` ` `` and inject variables with `${variableName}`.',
          explanation:
            'Backticks unlock `${ }` interpolation so JavaScript inserts the values of `user` and `points` seamlessly.',
        },
        debug: {
          prompt: 'The welcome message prints `"Welcome, ${name}!"` literally instead of `"Welcome, Ada!"`. Fix the quotes!',
          symptom: 'Logged "Welcome, ${name}!" instead of "Welcome, Ada!".',
          buggyCode: `const name = "Ada";
const message = "Welcome, \${name}!";
console.log(message);`,
          solutionCode: `const name = "Ada";
const message = \`Welcome, \${name}!\`;
console.log(message);`,
          clue: 'Double quotes `"..."` ignore `${...}`. Switch them to backticks `` `...` `` on line 2.',
          testDescription: 'message equals "Welcome, Ada!"',
          assertionScript: `
            if (message !== 'Welcome, Ada!') return { ok: false, message: 'Got "' + message + '". Use backticks \`...\` so \${name} turns into Ada.' };
            return { ok: true, message: 'Clean! Backticks turned the placeholder into "Welcome, Ada!".' };
          `,
        },
        quiz: [
          {
            id: 's1-l3-q1',
            question: 'Which quote character enables `${variable}` insertion inside text?',
            options: ['Single quotes \'...\'', 'Double quotes "..."', 'Backticks `...`'],
            correctIndex: 2,
            explanation: 'Only backticks (`` ` ``) create template literals that evaluate `${...}` expressions.',
          },
          {
            id: 's1-l3-q2',
            question: 'What does `10 % 3` calculate in JavaScript?',
            options: ['10 percent of 3', 'The remainder after dividing 10 by 3 (which is 1)', '10 divided by 3'],
            correctIndex: 1,
            explanation: 'The `%` (modulo) operator gives the remainder left over after division: 10 ÷ 3 = 3 with 1 left over.',
          },
        ],
      },
    ],
    project: {
      id: 'proj-stage-1',
      stageId: 'stage-1',
      title: 'Stage 1 Mini-Project: Tip & Bill Splitter Card',
      summary:
        'Combine HTML inputs, CSS card styling, and Stage 1 JavaScript (variables, `Number()`, arithmetic, and template strings) to calculate each person’s share live.',
      whatYouCombine: 'HTML form inputs + CSS flexbox card + JS Number conversion & template strings',
      starterHtml: `<div class="card">
  <h2>Dinner Bill Splitter</h2>
  <label>Bill Amount ($)
    <input id="billInput" type="number" value="60" />
  </label>
  <label>Tip (%)
    <input id="tipInput" type="number" value="15" />
  </label>
  <label>People
    <input id="peopleInput" type="number" value="3" />
  </label>
  <button id="calcBtn">Calculate Split</button>
  <p id="resultText" class="result">Click calculate to see each share.</p>
</div>`,
      starterCss: `.card {
  max-width: 340px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 20px;
}
h2 { margin: 0 0 14px; font-size: 18px; }
label { display: block; font-size: 13px; color: #475569; margin-bottom: 10px; }
input {
  width: 100%;
  margin-top: 4px;
  padding: 8px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
}
button {
  width: 100%;
  margin-top: 6px;
  padding: 10px;
  background: #0284c7;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.result {
  margin: 14px 0 0;
  padding: 10px;
  background: #f1f5f9;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
}`,
      starterJs: `const billInput = document.getElementById("billInput");
const tipInput = document.getElementById("tipInput");
const peopleInput = document.getElementById("peopleInput");
const calcBtn = document.getElementById("calcBtn");
const resultText = document.getElementById("resultText");

calcBtn.addEventListener("click", function () {
  // Step 1: Convert input values using Number(...)
  const bill = Number(billInput.value);
  const tipPercent = Number(tipInput.value);
  const people = Number(peopleInput.value);

  // Step 2: Calculate tipAmount and totalWithTip
  const tipAmount = bill * (tipPercent / 100);
  const total = 0; // TODO: replace 0 with bill + tipAmount

  // Step 3: Divide total by people and display with a template string
  const perPerson = total / people;
  resultText.textContent = "TODO: show perPerson";
});`,
      solutionHtml: `<div class="card">
  <h2>Dinner Bill Splitter</h2>
  <label>Bill Amount ($)
    <input id="billInput" type="number" value="60" />
  </label>
  <label>Tip (%)
    <input id="tipInput" type="number" value="15" />
  </label>
  <label>People
    <input id="peopleInput" type="number" value="3" />
  </label>
  <button id="calcBtn">Calculate Split</button>
  <p id="resultText" class="result">Click calculate to see each share.</p>
</div>`,
      solutionCss: `.card {
  max-width: 340px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 20px;
}
h2 { margin: 0 0 14px; font-size: 18px; }
label { display: block; font-size: 13px; color: #475569; margin-bottom: 10px; }
input {
  width: 100%;
  margin-top: 4px;
  padding: 8px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
}
button {
  width: 100%;
  margin-top: 6px;
  padding: 10px;
  background: #0284c7;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.result {
  margin: 14px 0 0;
  padding: 10px;
  background: #f1f5f9;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
}`,
      solutionJs: `const billInput = document.getElementById("billInput");
const tipInput = document.getElementById("tipInput");
const peopleInput = document.getElementById("peopleInput");
const calcBtn = document.getElementById("calcBtn");
const resultText = document.getElementById("resultText");

calcBtn.addEventListener("click", function () {
  const bill = Number(billInput.value);
  const tipPercent = Number(tipInput.value);
  const people = Number(peopleInput.value);

  const tipAmount = bill * (tipPercent / 100);
  const total = bill + tipAmount;

  const perPerson = (total / people).toFixed(2);
  resultText.textContent = \`Each person pays $\${perPerson} (Total: $\${total.toFixed(2)})\`;
});`,
      steps: [
        {
          id: 'p1-s1',
          title: 'Compute total bill',
          instruction: 'Replace `const total = 0;` with `const total = bill + tipAmount;` in JS.',
          checkPattern: 'bill\\s*\\+\\s*tipAmount',
          targetFile: 'js',
        },
        {
          id: 'p1-s2',
          title: 'Display result with template string',
          instruction: 'Update `resultText.textContent` to use backticks and `${perPerson}`.',
          checkPattern: '`[^`]*\\$\\{perPerson\\}[^`]*`',
          targetFile: 'js',
        },
      ],
    },
  },
  {
    id: 'stage-2',
    number: 2,
    title: 'Decisions & Loops',
    level: 'Beginner',
    summary:
      'Teach your programs how to pick between paths using if/else rules and repeat boring tasks automatically with loops.',
    visualImage: '/src/assets/images/stage_2_flowgates_1795383142323.jpg',
    visualCaption:
      'An if/else gate switches the railway track based on a condition, while a loop circles the track until every crate is processed.',
    lessons: [
      {
        id: 's2-l1',
        stageId: 'stage-2',
        order: 1,
        title: 'Comparisons & if / else',
        subtitle: 'Making your code choose the right fork in the road',
        estimatedMinutes: 6,
        simulatorId: 'conditionals-gate',
        plainEnglish:
          '`if (condition)` asks a yes-or-no question. If the answer is `true`, JavaScript runs the first block. Otherwise, it jumps straight to the `else` block.',
        realLifeAnalogy:
          'Like a coffee shop register: IF you bring a reusable cup, take $1 off; ELSE charge the regular price.',
        watchOutFor:
          'Use `===` (three equals) to compare two values. A single `=` assigns a value by mistake!',
        codeExample: `const temp = 31;

if (temp >= 30) {
  console.log("Wear sunscreen!");
} else {
  console.log("A light jacket is fine.");
}`,
        fillGap: {
          prompt: 'Check if a user is old enough (18 or older) to enter.',
          lines: [
            [{ type: 'text', value: 'const age = 20;' }],
            [
              { type: 'blank', value: '', blankId: 'b1' },
              { type: 'text', value: ' (age ' },
              { type: 'blank', value: '', blankId: 'b2' },
              { type: 'text', value: ' 18) {' },
            ],
            [{ type: 'text', value: '  console.log("Welcome in");' }],
            [
              { type: 'text', value: '} ' },
              { type: 'blank', value: '', blankId: 'b3' },
              { type: 'text', value: ' {' },
            ],
            [{ type: 'text', value: '  console.log("Too young");' }],
            [{ type: 'text', value: '}' }],
          ],
          answers: {
            b1: 'if',
            b2: '>=',
            b3: 'else',
          },
          wordBank: ['if', '>=', 'else', '===', 'for'],
          hint: 'Use `>=` for "greater than or equal to".',
          explanation: '`if (age >= 18)` checks 18 and above, and `else` catches every age under 18.',
        },
        debug: {
          prompt: 'Even when `role` is `"guest"`, this code prints `"Full admin access"`! Fix the comparison bug.',
          symptom: 'Always prints "Full admin access" regardless of role.',
          buggyCode: `const role = "guest";

if (role = "admin") {
  console.log("Full admin access");
} else {
  console.log("Guest view");
}`,
          solutionCode: `const role = "guest";

if (role === "admin") {
  console.log("Full admin access");
} else {
  console.log("Guest view");
}`,
          clue: 'Look inside `if (...)` on line 3: `=` sets a value instead of comparing with `===`.',
          testDescription: 'Logs "Guest view" when role is "guest".',
          assertionScript: `
            if (__logs[0] !== 'Guest view') return { ok: false, message: 'Expected "Guest view", got "' + (__logs[0] || 'nothing') + '". Check = vs ===.' };
            return { ok: true, message: 'Fixed! Using === compares role properly without overwriting it.' };
          `,
        },
        quiz: [
          {
            id: 's2-l1-q1',
            question: 'Which operator checks if two values are strictly equal (same value AND same type)?',
            options: ['=', '===', '=>'],
            correctIndex: 1,
            explanation: '`===` checks strict equality without weird type-guessing. Single `=` is only for assigning variables.',
          },
          {
            id: 's2-l1-q2',
            question: 'What does `10 > 10` evaluate to?',
            options: ['true', 'false', '10'],
            correctIndex: 1,
            explanation: '10 is equal to 10, not strictly greater than 10, so `10 > 10` is `false`.',
          },
        ],
      },
      {
        id: 's2-l2',
        stageId: 'stage-2',
        order: 2,
        title: 'Logical Operators: &&, || and !',
        subtitle: 'Combining two rules into one decision',
        estimatedMinutes: 5,
        simulatorId: 'logical-switches',
        plainEnglish:
          '`&&` (AND) needs BOTH rules to be true. `||` (OR) needs AT LEAST ONE rule to be true. `!` (NOT) flips `true` to `false` and `false` to `true`.',
        realLifeAnalogy:
          'Unlocking a safe with two keys is `&&` (you need key A AND key B). Opening a door with a key OR a keypad code is `||`.',
        watchOutFor:
          'You cannot write `if (day === "Sat" || "Sun")`. You must repeat the comparison on both sides: `if (day === "Sat" || day === "Sun")`.',
        codeExample: `const hasTicket = true;
const isVip = false;

if (hasTicket && isVip) {
  console.log("Backstage pass");
} else if (hasTicket || isVip) {
  console.log("Standard entry");
}`,
        fillGap: {
          prompt: 'Allow free shipping if the cart is over $50 OR the user is a member.',
          lines: [
            [{ type: 'text', value: 'const cartTotal = 35;' }],
            [{ type: 'text', value: 'const isMember = true;' }],
            [
              { type: 'text', value: 'const freeShipping = cartTotal > 50 ' },
              { type: 'blank', value: '', blankId: 'b1' },
              { type: 'text', value: ' isMember;' },
            ],
            [
              { type: 'text', value: 'const needsFee = ' },
              { type: 'blank', value: '', blankId: 'b2' },
              { type: 'text', value: 'freeShipping;' },
            ],
          ],
          answers: {
            b1: '||',
            b2: '!',
          },
          wordBank: ['||', '&&', '!', '==='],
          hint: 'Only one condition needs to be true for free shipping (`||`). Flip a boolean with `!`.',
          explanation: '`||` means OR (either condition grants free shipping), and `!` flips `true` to `false`.',
        },
        debug: {
          prompt: 'A ride requires BOTH height >= 120 AND an adult. Right now, a short child with an adult gets in! Fix the operator.',
          symptom: 'Logged "Safe to ride" when height is 100.',
          buggyCode: `const heightCm = 100;
const withAdult = true;

if (heightCm >= 120 || withAdult) {
  console.log("Safe to ride");
} else {
  console.log("Cannot ride yet");
}`,
          solutionCode: `const heightCm = 100;
const withAdult = true;

if (heightCm >= 120 && withAdult) {
  console.log("Safe to ride");
} else {
  console.log("Cannot ride yet");
}`,
          clue: 'Line 4 uses `||` (OR), so having an adult bypasses the height rule. Switch to `&&` (AND).',
          testDescription: 'Logs "Cannot ride yet" because heightCm is under 120.',
          assertionScript: `
            if (__logs[0] !== 'Cannot ride yet') return { ok: false, message: 'Still logged "' + __logs[0] + '". Both conditions must be true, so use &&.' };
            return { ok: true, message: 'Great catch! Using && ensures both height and adult checks pass.' };
          `,
        },
        quiz: [
          {
            id: 's2-l2-q1',
            question: 'What is the result of `true && false`?',
            options: ['true', 'false'],
            correctIndex: 1,
            explanation: '`&&` requires BOTH sides to be `true`. Since one side is `false`, the whole expression is `false`.',
          },
          {
            id: 's2-l2-q2',
            question: 'What does `!false` evaluate to?',
            options: ['false', 'true', 'undefined'],
            correctIndex: 1,
            explanation: 'The `!` (NOT) operator flips any boolean to its opposite: `!false` becomes `true`.',
          },
        ],
      },
      {
        id: 's2-l3',
        stageId: 'stage-2',
        order: 3,
        title: 'Loops: for & while',
        subtitle: 'Repeating an action cleanly without copy-pasting',
        estimatedMinutes: 7,
        simulatorId: 'loop-track',
        plainEnglish:
          'A `for` loop has three neat parts in parentheses: (1) where the counter starts (`let i = 0`), (2) when to keep going (`i < 3`), and (3) how to step forward (`i++`).',
        realLifeAnalogy:
          'Washing 5 plates: Start at plate 1, keep washing while plate ≤ 5, move to the next plate after each one.',
        watchOutFor:
          'Watch out for off-by-one bugs (`<` vs `<=`) and infinite loops where the counter never moves toward the stop condition!',
        codeExample: `for (let i = 1; i <= 3; i++) {
  console.log("Lap " + i);
}
// Prints: Lap 1, Lap 2, Lap 3`,
        fillGap: {
          prompt: 'Loop through numbers 0, 1, and 2 (3 times total).',
          lines: [
            [
              { type: 'blank', value: '', blankId: 'b1' },
              { type: 'text', value: ' (let i = ' },
              { type: 'blank', value: '', blankId: 'b2' },
              { type: 'text', value: '; i < 3; ' },
              { type: 'blank', value: '', blankId: 'b3' },
              { type: 'text', value: ') {' },
            ],
            [{ type: 'text', value: '  console.log(i);' }],
            [{ type: 'text', value: '}' }],
          ],
          answers: {
            b1: 'for',
            b2: '0',
            b3: 'i++',
          },
          wordBank: ['for', '0', 'i++', 'if', 'i--'],
          hint: 'Start `i` at `0`, stop before `3`, and increment with `i++`.',
          explanation: '`for (let i = 0; i < 3; i++)` runs for `i = 0`, `1`, and `2`, then stops as soon as `i` reaches `3`.',
        },
        debug: {
          prompt: 'This loop is supposed to add numbers 1 + 2 + 3 + 4 (= 10), but it stops too early at 6! Fix the condition.',
          symptom: 'sum ends up as 6 instead of 10.',
          buggyCode: `let sum = 0;

for (let i = 1; i < 4; i++) {
  sum = sum + i;
}

console.log(sum);`,
          solutionCode: `let sum = 0;

for (let i = 1; i <= 4; i++) {
  sum = sum + i;
}

console.log(sum);`,
          clue: 'When `i < 4`, the loop stops before `i` becomes `4`. Change `<` to `<=` (or `< 5`).',
          testDescription: 'sum equals 10 and logs 10.',
          assertionScript: `
            if (sum !== 10) return { ok: false, message: 'sum is ' + sum + ' instead of 10. Include 4 in the loop!' };
            return { ok: true, message: 'Awesome! Including 4 with i <= 4 gives 1 + 2 + 3 + 4 = 10.' };
          `,
        },
        quiz: [
          {
            id: 's2-l3-q1',
            question: 'How many times does `for (let i = 0; i < 5; i++)` run?',
            options: ['4 times', '5 times', '6 times'],
            correctIndex: 1,
            explanation: 'It runs for `0, 1, 2, 3, 4` — that is 5 iterations in total!',
          },
          {
            id: 's2-l3-q2',
            question: 'What does `i++` mean?',
            options: ['Multiply i by 2', 'Add 1 to i', 'Reset i to 0'],
            correctIndex: 1,
            explanation: '`i++` is shorthand for `i = i + 1`.',
          },
        ],
      },
    ],
    project: {
      id: 'proj-stage-2',
      stageId: 'stage-2',
      title: 'Stage 2 Mini-Project: Smart Focus & Break Advisor',
      summary:
        'Combine HTML range controls, CSS dynamic state colors, and Stage 2 JavaScript (`if/else`, `&&`, and a `for` loop) to generate personalized break steps.',
      whatYouCombine: 'HTML slider + CSS mood classes + JS if/else & for-loop list builder',
      starterHtml: `<div class="panel">
  <h2>Study Focus Check-In</h2>
  <label>Minutes studied so far: <strong id="minsLabel">45</strong> min
    <input id="minsSlider" type="range" min="0" max="120" value="45" />
  </label>
  <label class="checkbox-row">
    <input id="tiredCheck" type="checkbox" /> I feel tired
  </label>
  <button id="checkBtn">Get Advice</button>
  <div id="statusBox" class="status">Move the slider and click Get Advice.</div>
  <ul id="tipsList" class="tips"></ul>
</div>`,
      starterCss: `.panel {
  max-width: 360px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 20px;
}
h2 { margin: 0 0 12px; font-size: 18px; }
label { display: block; font-size: 13px; color: #334155; margin-bottom: 10px; }
input[type="range"] { width: 100%; margin-top: 6px; }
.checkbox-row { display: flex; align-items: center; gap: 8px; margin: 8px 0 14px; }
button {
  width: 100%;
  padding: 10px;
  background: #0284c7;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.status {
  margin-top: 14px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  background: #f1f5f9;
}
.status.break { background: #fef3c7; color: #92400e; }
.status.focus { background: #d1fae5; color: #065f46; }
.tips { margin: 12px 0 0; padding-left: 18px; font-size: 13px; color: #475569; }`,
      starterJs: `const slider = document.getElementById("minsSlider");
const minsLabel = document.getElementById("minsLabel");
const tiredCheck = document.getElementById("tiredCheck");
const checkBtn = document.getElementById("checkBtn");
const statusBox = document.getElementById("statusBox");
const tipsList = document.getElementById("tipsList");

slider.addEventListener("input", function () {
  minsLabel.textContent = slider.value;
});

checkBtn.addEventListener("click", function () {
  const mins = Number(slider.value);
  const isTired = tiredCheck.checked;

  // Step 1: Use if / else with || (mins >= 50 || isTired)
  if (false) { // TODO: replace false with (mins >= 50 || isTired)
    statusBox.textContent = "Time for a 5-minute stretch break!";
    statusBox.className = "status break";
  } else {
    statusBox.textContent = "Keep going! You are in a healthy flow.";
    statusBox.className = "status focus";
  }

  // Step 2: Use a for loop to list 3 quick break steps
  const tips = ["Stand up & stretch", "Drink a glass of water", "Look away from screen"];
  tipsList.innerHTML = "";
  // TODO: loop from i = 0 to i < tips.length and append <li> items
});`,
      solutionHtml: `<div class="panel">
  <h2>Study Focus Check-In</h2>
  <label>Minutes studied so far: <strong id="minsLabel">45</strong> min
    <input id="minsSlider" type="range" min="0" max="120" value="45" />
  </label>
  <label class="checkbox-row">
    <input id="tiredCheck" type="checkbox" /> I feel tired
  </label>
  <button id="checkBtn">Get Advice</button>
  <div id="statusBox" class="status">Move the slider and click Get Advice.</div>
  <ul id="tipsList" class="tips"></ul>
</div>`,
      solutionCss: `.panel {
  max-width: 360px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 20px;
}
h2 { margin: 0 0 12px; font-size: 18px; }
label { display: block; font-size: 13px; color: #334155; margin-bottom: 10px; }
input[type="range"] { width: 100%; margin-top: 6px; }
.checkbox-row { display: flex; align-items: center; gap: 8px; margin: 8px 0 14px; }
button {
  width: 100%;
  padding: 10px;
  background: #0284c7;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.status {
  margin-top: 14px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  background: #f1f5f9;
}
.status.break { background: #fef3c7; color: #92400e; }
.status.focus { background: #d1fae5; color: #065f46; }
.tips { margin: 12px 0 0; padding-left: 18px; font-size: 13px; color: #475569; }`,
      solutionJs: `const slider = document.getElementById("minsSlider");
const minsLabel = document.getElementById("minsLabel");
const tiredCheck = document.getElementById("tiredCheck");
const checkBtn = document.getElementById("checkBtn");
const statusBox = document.getElementById("statusBox");
const tipsList = document.getElementById("tipsList");

slider.addEventListener("input", function () {
  minsLabel.textContent = slider.value;
});

checkBtn.addEventListener("click", function () {
  const mins = Number(slider.value);
  const isTired = tiredCheck.checked;

  if (mins >= 50 || isTired) {
    statusBox.textContent = "Time for a 5-minute stretch break!";
    statusBox.className = "status break";
  } else {
    statusBox.textContent = "Keep going! You are in a healthy flow.";
    statusBox.className = "status focus";
  }

  const tips = ["Stand up & stretch", "Drink a glass of water", "Look away from screen"];
  tipsList.innerHTML = "";
  for (let i = 0; i < tips.length; i++) {
    const li = document.createElement("li");
    li.textContent = tips[i];
    tipsList.appendChild(li);
  }
});`,
      steps: [
        {
          id: 'p2-s1',
          title: 'Wire the OR condition',
          instruction: 'Replace `if (false)` with `if (mins >= 50 || isTired)`.',
          checkPattern: 'mins\\s*>=\\s*50\\s*\\|\\|\\s*isTired',
          targetFile: 'js',
        },
        {
          id: 'p2-s2',
          title: 'Render tips with a for loop',
          instruction: 'Add a `for (let i = 0; i < tips.length; i++)` loop to create `<li>` items.',
          checkPattern: 'for\\s*\\(\\s*let\\s+i\\s*=\\s*0',
          targetFile: 'js',
        },
      ],
    },
  },
  {
    id: 'stage-3',
    number: 3,
    title: 'Functions, Arrays & Objects',
    level: 'Early Intermediate',
    summary:
      'Package reusable steps into functions, store ordered lists in arrays, and organize real-world things using objects.',
    visualImage: '/src/assets/images/stage_3_machine_1795383141988.jpg',
    visualCaption:
      'A function works like a machine: drop inputs into the funnel, run the steps inside, and return one neat result out the right side.',
    lessons: [
      {
        id: 's3-l1',
        stageId: 'stage-3',
        order: 1,
        title: 'Functions: Inputs & return',
        subtitle: 'Reusable mini-machines that take inputs and hand back outputs',
        estimatedMinutes: 6,
        simulatorId: 'function-machine',
        plainEnglish:
          'A function is a named recipe you can call as many times as you like. Parameters are the empty ingredient slots, and `return` hands the finished dish back to whoever called it.',
        realLifeAnalogy:
          'A toaster is a function: bread goes in as the parameter, heat runs inside, and toast is returned.',
        watchOutFor:
          '`console.log()` only prints to the screen for humans—it does NOT hand a value back to your code! Always use `return` if another line needs the answer.',
        codeExample: `function doublePrice(price) {
  return price * 2;
}

const result = doublePrice(15);
console.log(result); // 30`,
        fillGap: {
          prompt: 'Write a function `greetUser` that accepts a `name` and returns `"Hello, " + name`.',
          lines: [
            [
              { type: 'blank', value: '', blankId: 'b1' },
              { type: 'text', value: ' greetUser(' },
              { type: 'blank', value: '', blankId: 'b2' },
              { type: 'text', value: ') {' },
            ],
            [
              { type: 'text', value: '  ' },
              { type: 'blank', value: '', blankId: 'b3' },
              { type: 'text', value: ' "Hello, " + name;' },
            ],
            [{ type: 'text', value: '}' }],
          ],
          answers: {
            b1: 'function',
            b2: 'name',
            b3: 'return',
          },
          wordBank: ['function', 'name', 'return', 'console.log', 'let'],
          hint: 'Functions start with `function`, receive parameters inside `(...)`, and send back a value with `return`.',
          explanation: '`function greetUser(name)` defines the machine, and `return` sends the greeting back out.',
        },
        debug: {
          prompt: '`applyDiscount(100)` logs `80`, so `finalPrice` turns out `undefined`! Make the function return the discounted price.',
          symptom: 'finalPrice is undefined instead of 80.',
          buggyCode: `function applyDiscount(price) {
  const discounted = price - 20;
  console.log(discounted);
}

const finalPrice = applyDiscount(100);
console.log("Final:", finalPrice);`,
          solutionCode: `function applyDiscount(price) {
  const discounted = price - 20;
  return discounted;
}

const finalPrice = applyDiscount(100);
console.log("Final:", finalPrice);`,
          clue: 'Replace `console.log(discounted)` inside the function with `return discounted;`.',
          testDescription: 'applyDiscount(100) returns 80 so finalPrice equals 80.',
          assertionScript: `
            if (typeof applyDiscount !== 'function') return { ok: false, message: 'Keep the applyDiscount function.' };
            if (finalPrice !== 80) return { ok: false, message: 'finalPrice is ' + finalPrice + '. A function needs return to hand back 80!' };
            return { ok: true, message: 'Nailed it! return hands 80 straight into finalPrice.' };
          `,
        },
        quiz: [
          {
            id: 's3-l1-q1',
            question: 'What does a function give back if you forget to write a `return` statement?',
            options: ['0', 'undefined', 'null'],
            correctIndex: 1,
            explanation: 'Without `return`, a JavaScript function finishes and automatically returns `undefined`.',
          },
          {
            id: 's3-l1-q2',
            question: 'In `function add(a, b) { return a + b; }`, what are `a` and `b` called?',
            options: ['Parameters', 'Arrays', 'Objects'],
            correctIndex: 0,
            explanation: 'Named inputs inside the function parentheses are called parameters.',
          },
        ],
      },
      {
        id: 's3-l2',
        stageId: 'stage-3',
        order: 2,
        title: 'Arrays & Array Methods',
        subtitle: 'Ordered lists and how map & filter transform them',
        estimatedMinutes: 7,
        simulatorId: 'array-train',
        plainEnglish:
          'An array stores items in numbered slots starting at index `0`. Use `.push()` to add to the end, `.map()` to transform every item, and `.filter()` to keep only items that pass a test.',
        realLifeAnalogy:
          'Think of an array like train cars numbered `0, 1, 2...`. `.map()` paints every car a new color; `.filter()` keeps only the passenger cars.',
        watchOutFor:
          'Array counting always starts at `0`, NOT `1`! So `fruits[0]` is the first item, and the last item is at `fruits[fruits.length - 1]`.',
        codeExample: `const prices = [10, 20, 30];
const doubled = prices.map(p => p * 2);      // [20, 40, 60]
const big = prices.filter(p => p >= 20);     // [20, 30]`,
        fillGap: {
          prompt: 'Filter the scores array to keep only passing scores (70 or higher).',
          lines: [
            [{ type: 'text', value: 'const scores = [55, 80, 92, 60];' }],
            [
              { type: 'text', value: 'const passing = scores.' },
              { type: 'blank', value: '', blankId: 'b1' },
              { type: 'text', value: '(s => s ' },
              { type: 'blank', value: '', blankId: 'b2' },
              { type: 'text', value: ' 70);' },
            ],
            [
              { type: 'text', value: 'console.log(passing.' },
              { type: 'blank', value: '', blankId: 'b3' },
              { type: 'text', value: '); // 2' },
            ],
          ],
          answers: {
            b1: 'filter',
            b2: '>=',
            b3: 'length',
          },
          wordBank: ['filter', '>=', 'length', 'map', 'size'],
          hint: '`.filter()` keeps matching items, and `.length` counts how many items are in an array.',
          explanation: '`.filter(s => s >= 70)` produces `[80, 92]`, whose `.length` is `2`.',
        },
        debug: {
          prompt: 'We want to read the FIRST item `"Red"` from the `colors` array, but `first` prints `"Green"`! Fix the index.',
          symptom: 'Logged "Green" instead of "Red".',
          buggyCode: `const colors = ["Red", "Green", "Blue"];
const first = colors[1];

console.log(first);`,
          solutionCode: `const colors = ["Red", "Green", "Blue"];
const first = colors[0];

console.log(first);`,
          clue: 'Remember: JavaScript arrays start counting at index `0`, not `1`!',
          testDescription: 'first equals "Red".',
          assertionScript: `
            if (first !== 'Red') return { ok: false, message: 'first is "' + first + '". Arrays start at index 0!' };
            return { ok: true, message: 'Correct! Index 0 always grabs the very first item in an array.' };
          `,
        },
        quiz: [
          {
            id: 's3-l2-q1',
            question: 'Which array method creates a new array by transforming every single item?',
            options: ['.filter()', '.map()', '.pop()'],
            correctIndex: 1,
            explanation: '`.map()` runs your rule on each element and returns a brand-new transformed array of the same length.',
          },
          {
            id: 's3-l2-q2',
            question: 'What is `["a", "b", "c"][2]`?',
            options: ['"b"', '"c"', 'undefined'],
            correctIndex: 1,
            explanation: 'Index 0 is `"a"`, index 1 is `"b"`, and index 2 is `"c"`.',
          },
        ],
      },
      {
        id: 's3-l3',
        stageId: 'stage-3',
        order: 3,
        title: 'Objects & Properties',
        subtitle: 'Grouping related details together by key name',
        estimatedMinutes: 6,
        simulatorId: 'object-cabinet',
        plainEnglish:
          'While arrays store lists by number (`0, 1, 2`), an Object stores related facts using clear key names inside curly braces `{ key: value }`. Read or update any detail with dot notation (`user.name`).',
        realLifeAnalogy:
          'An object is a labeled filing folder for one person: `name: "Zara"`, `level: 3`, `isActive: true`.',
        watchOutFor:
          'Inside `{ ... }`, use a colon `:` between the key and value—NOT `=`—and separate each pair with a comma `,`.',
        codeExample: `const book = {
  title: "JS Made Visual",
  pages: 120,
  isRead: false
};

book.isRead = true;
console.log(book.title);`,
        fillGap: {
          prompt: 'Define a `phone` object and read its `brand` property.',
          lines: [
            [{ type: 'text', value: 'const phone = {' }],
            [
              { type: 'text', value: '  brand' },
              { type: 'blank', value: '', blankId: 'b1' },
              { type: 'text', value: ' "Pixel",' },
            ],
            [
              { type: 'text', value: '  battery' },
              { type: 'blank', value: '', blankId: 'b2' },
              { type: 'text', value: ' 85' },
            ],
            [{ type: 'text', value: '};' }],
            [
              { type: 'text', value: 'console.log(phone.' },
              { type: 'blank', value: '', blankId: 'b3' },
              { type: 'text', value: ');' },
            ],
          ],
          answers: {
            b1: ':',
            b2: ':',
            b3: 'brand',
          },
          wordBank: [':', ':', 'brand', '=', '0'],
          hint: 'Object properties use a colon `:` and are accessed with `objectName.propertyName`.',
          explanation: 'Key-value pairs inside `{ }` use `:` and dot notation `phone.brand` retrieves `"Pixel"`.',
        },
        debug: {
          prompt: 'This object throws a SyntaxError because someone used `=` instead of `:` inside `{ }`. Fix it and log `pet.name`.',
          symptom: 'SyntaxError: Invalid shorthand property initializer.',
          buggyCode: `const pet = {
  name = "Milo",
  age: 4
};

console.log(pet.name);`,
          solutionCode: `const pet = {
  name: "Milo",
  age: 4
};

console.log(pet.name);`,
          clue: 'Look at line 2: replace `=` with `:` inside the object literal.',
          testDescription: 'pet.name is "Milo" and logs "Milo".',
          assertionScript: `
            if (typeof pet !== 'object' || pet.name !== 'Milo') return { ok: false, message: 'Make sure pet.name equals "Milo".' };
            if (__logs[0] !== 'Milo') return { ok: false, message: 'Log pet.name so "Milo" is printed.' };
            return { ok: true, message: 'Clean! Colons define properties inside JavaScript objects.' };
          `,
        },
        quiz: [
          {
            id: 's3-l3-q1',
            question: 'When is an Object better than an Array?',
            options: [
              'When storing a single item’s named details (name, price, stock)',
              'When storing a ranked leaderboard list',
            ],
            correctIndex: 0,
            explanation: 'Objects shine when every piece of data has a descriptive label (key); Arrays shine for ordered lists.',
          },
          {
            id: 's3-l3-q2',
            question: 'How do you update `user.xp` from 10 to 20?',
            options: ['user.xp: 20;', 'user.xp = 20;', 'user->xp = 20;'],
            correctIndex: 1,
            explanation: 'Outside `{ }`, you reassign an object property using `=` with dot notation: `user.xp = 20;`.',
          },
        ],
      },
    ],
    project: {
      id: 'proj-stage-3',
      stageId: 'stage-3',
      title: 'Stage 3 Mini-Project: Pocket Expense Tracker',
      summary:
        'Combine HTML form controls, CSS list cards, and Stage 3 JavaScript (arrays of objects, `.push()`, `.filter()`, and a total helper function).',
      whatYouCombine: 'HTML expense form + CSS summary chips + JS array of objects + filter/function',
      starterHtml: `<div class="app">
  <h2>Pocket Expense Tracker</h2>
  <div class="row">
    <input id="itemInput" type="text" placeholder="Coffee, Lunch..." />
    <input id="costInput" type="number" placeholder="$" />
    <button id="addBtn">Add</button>
  </div>
  <p class="total-bar">Total Spent: <strong id="totalAmount">$0</strong></p>
  <ul id="expenseList"></ul>
</div>`,
      starterCss: `.app {
  max-width: 380px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 20px;
}
h2 { margin: 0 0 12px; font-size: 18px; }
.row { display: flex; gap: 6px; }
input {
  padding: 8px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 13px;
}
#itemInput { flex: 2; }
#costInput { width: 72px; }
button {
  padding: 8px 14px;
  background: #0284c7;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.total-bar {
  margin: 14px 0 10px;
  padding: 10px 12px;
  background: #f1f5f9;
  border-radius: 8px;
  font-size: 14px;
}
ul { list-style: none; padding: 0; margin: 0; }
li {
  display: flex;
  justify-content: space-between;
  padding: 8px 4px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
}`,
      starterJs: `const expenses = [
  { name: "Notebook", cost: 8 },
  { name: "Tea", cost: 4 }
];

const itemInput = document.getElementById("itemInput");
const costInput = document.getElementById("costInput");
const addBtn = document.getElementById("addBtn");
const totalAmount = document.getElementById("totalAmount");
const expenseList = document.getElementById("expenseList");

function calculateTotal(list) {
  let sum = 0;
  // TODO: loop through list and add item.cost to sum
  return sum;
}

function renderExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach(function (entry) {
    const li = document.createElement("li");
    li.innerHTML = \`<span>\${entry.name}</span><strong>$\${entry.cost}</strong>\`;
    expenseList.appendChild(li);
  });
  totalAmount.textContent = "$" + calculateTotal(expenses);
}

addBtn.addEventListener("click", function () {
  const name = itemInput.value.trim();
  const cost = Number(costInput.value);
  if (!name || cost <= 0) return;

  // TODO: push a new { name, cost } object into expenses
  itemInput.value = "";
  costInput.value = "";
  renderExpenses();
});

renderExpenses();`,
      solutionHtml: `<div class="app">
  <h2>Pocket Expense Tracker</h2>
  <div class="row">
    <input id="itemInput" type="text" placeholder="Coffee, Lunch..." />
    <input id="costInput" type="number" placeholder="$" />
    <button id="addBtn">Add</button>
  </div>
  <p class="total-bar">Total Spent: <strong id="totalAmount">$0</strong></p>
  <ul id="expenseList"></ul>
</div>`,
      solutionCss: `.app {
  max-width: 380px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 20px;
}
h2 { margin: 0 0 12px; font-size: 18px; }
.row { display: flex; gap: 6px; }
input {
  padding: 8px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 13px;
}
#itemInput { flex: 2; }
#costInput { width: 72px; }
button {
  padding: 8px 14px;
  background: #0284c7;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.total-bar {
  margin: 14px 0 10px;
  padding: 10px 12px;
  background: #f1f5f9;
  border-radius: 8px;
  font-size: 14px;
}
ul { list-style: none; padding: 0; margin: 0; }
li {
  display: flex;
  justify-content: space-between;
  padding: 8px 4px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
}`,
      solutionJs: `const expenses = [
  { name: "Notebook", cost: 8 },
  { name: "Tea", cost: 4 }
];

const itemInput = document.getElementById("itemInput");
const costInput = document.getElementById("costInput");
const addBtn = document.getElementById("addBtn");
const totalAmount = document.getElementById("totalAmount");
const expenseList = document.getElementById("expenseList");

function calculateTotal(list) {
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += list[i].cost;
  }
  return sum;
}

function renderExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach(function (entry) {
    const li = document.createElement("li");
    li.innerHTML = \`<span>\${entry.name}</span><strong>$\${entry.cost}</strong>\`;
    expenseList.appendChild(li);
  });
  totalAmount.textContent = "$" + calculateTotal(expenses);
}

addBtn.addEventListener("click", function () {
  const name = itemInput.value.trim();
  const cost = Number(costInput.value);
  if (!name || cost <= 0) return;

  expenses.push({ name: name, cost: cost });
  itemInput.value = "";
  costInput.value = "";
  renderExpenses();
});

renderExpenses();`,
      steps: [
        {
          id: 'p3-s1',
          title: 'Sum costs inside calculateTotal',
          instruction: 'Loop through `list` and add `list[i].cost` to `sum`.',
          checkPattern: 'sum\\s*(\\+=|=\\s*sum\\s*\\+)\\s*.*\\.cost',
          targetFile: 'js',
        },
        {
          id: 'p3-s2',
          title: 'Push new expense object',
          instruction: 'Use `expenses.push({ name, cost })` inside the Add button click.',
          checkPattern: 'expenses\\.push\\(',
          targetFile: 'js',
        },
      ],
    },
  },
  {
    id: 'stage-4',
    number: 4,
    title: 'DOM & Browser Events',
    level: 'Early Intermediate',
    summary:
      'Connect JavaScript to real HTML & CSS! Grab elements on the page, update their text and styles, and react to clicks and typing.',
    visualImage: '/src/assets/images/stage_4_domtree_1795383142284.jpg',
    visualCaption:
      'The browser turns your HTML into a live tree of nodes (the DOM) that JavaScript can select, restyle, and listen to.',
    lessons: [
      {
        id: 's4-l1',
        stageId: 'stage-4',
        order: 1,
        title: 'Selecting Elements (querySelector)',
        subtitle: 'Pointing JavaScript at the exact HTML element you want',
        estimatedMinutes: 5,
        simulatorId: 'dom-selector',
        plainEnglish:
          'Before JavaScript can change anything on a webpage, it has to find it. `document.querySelector(...)` uses the exact same CSS selectors you already know: `#id` for IDs, `.class` for classes, and `h1` for tags.',
        realLifeAnalogy:
          'Like picking a book from a shelf using its call number—once you grab the reference, you can read or edit it.',
        watchOutFor:
          'Forgetting the `.` before a class name or `#` before an ID returns `null` (meaning JavaScript could not find anything!).',
        codeExample: `const title = document.querySelector("#page-title");
const firstBtn = document.querySelector(".primary-btn");`,
        fillGap: {
          prompt: 'Select an element with id="hero-heading" and another with class="cta-btn".',
          lines: [
            [
              { type: 'text', value: 'const heading = document.' },
              { type: 'blank', value: '', blankId: 'b1' },
              { type: 'text', value: '("' },
              { type: 'blank', value: '', blankId: 'b2' },
              { type: 'text', value: 'hero-heading");' },
            ],
            [
              { type: 'text', value: 'const button = document.querySelector("' },
              { type: 'blank', value: '', blankId: 'b3' },
              { type: 'text', value: 'cta-btn");' },
            ],
          ],
          answers: {
            b1: 'querySelector',
            b2: '#',
            b3: '.',
          },
          wordBank: ['querySelector', '#', '.', 'getElement', '@'],
          hint: 'IDs start with `#` and classes start with `.` inside `querySelector`.',
          explanation: '`#` targets an `id` attribute, while `.` targets a `class` attribute.',
        },
        debug: {
          prompt: 'The selector helper returns `null` because the CSS selector prefix is missing! Fix `findSelector`.',
          symptom: 'Selector "card-title" misses the dot for a class selector.',
          buggyCode: `function getCardSelector() {
  return "card-title";
}

// Simulated check: class selectors must start with "."
const selector = getCardSelector();
console.log(selector);`,
          solutionCode: `function getCardSelector() {
  return ".card-title";
}

// Simulated check: class selectors must start with "."
const selector = getCardSelector();
console.log(selector);`,
          clue: 'Class selectors in `querySelector` need a leading dot `.` (`".card-title"`).',
          testDescription: 'getCardSelector() returns ".card-title".',
          assertionScript: `
            if (selector !== '.card-title') return { ok: false, message: 'Got "' + selector + '". Class selectors must begin with a dot: ".card-title".' };
            return { ok: true, message: 'Yes! Leading "." tells querySelector to look for a CSS class.' };
          `,
        },
        quiz: [
          {
            id: 's4-l1-q1',
            question: 'What does `document.querySelector(".missing")` return if no element matches?',
            options: ['null', 'false', '""'],
            correctIndex: 0,
            explanation: '`querySelector` returns `null` when nothing in the DOM matches your selector.',
          },
          {
            id: 's4-l1-q2',
            question: 'Which selector finds `<button id="save-btn">`?',
            options: ['document.querySelector(".save-btn")', 'document.querySelector("#save-btn")'],
            correctIndex: 1,
            explanation: 'An `id` attribute uses `#` (`#save-btn`), whereas a `class` attribute uses `.`.',
          },
        ],
      },
      {
        id: 's4-l2',
        stageId: 'stage-4',
        order: 2,
        title: 'Changing Text & CSS Classes',
        subtitle: 'Updating what the user sees in real time',
        estimatedMinutes: 5,
        simulatorId: 'dom-updater',
        plainEnglish:
          'Once you grab an element, change its words with `.textContent = "New words"`, or toggle a CSS class on and off with `.classList.toggle("active")` so CSS handles the visual look cleanly.',
        realLifeAnalogy:
          'Instead of repainting a wall by hand (`element.style...`), `classList.toggle` flips a light switch between two pre-designed CSS themes.',
        watchOutFor:
          'Prefer `.textContent` over `.innerHTML` for plain text—it is safer and faster!',
        codeExample: `const banner = document.querySelector("#banner");
banner.textContent = "Saved!";
banner.classList.add("success");`,
        fillGap: {
          prompt: 'Update the status text and toggle the `"highlighted"` CSS class on `card`.',
          lines: [
            [
              { type: 'text', value: 'card.' },
              { type: 'blank', value: '', blankId: 'b1' },
              { type: 'text', value: ' = "Lesson Complete";' },
            ],
            [
              { type: 'text', value: 'card.' },
              { type: 'blank', value: '', blankId: 'b2' },
              { type: 'text', value: '.' },
              { type: 'blank', value: '', blankId: 'b3' },
              { type: 'text', value: '("highlighted");' },
            ],
          ],
          answers: {
            b1: 'textContent',
            b2: 'classList',
            b3: 'toggle',
          },
          wordBank: ['textContent', 'classList', 'toggle', 'value', 'classes'],
          hint: 'Use `textContent` for text and `classList.toggle(...)` to switch a CSS class on/off.',
          explanation: '`textContent` safely updates the visible words, and `classList.toggle` cleanly turns CSS classes on or off.',
        },
        debug: {
          prompt: 'This mock DOM updater tried to call `element.className.toggle(...)` which crashes! Fix it to use `classList`.',
          symptom: 'TypeError: element.className.toggle is not a function.',
          buggyCode: `const classes = new Set();
const box = {
  textContent: "",
  classList: {
    toggle: (c) => classes.has(c) ? classes.delete(c) : classes.add(c),
    contains: (c) => classes.has(c)
  }
};

box.textContent = "Ready";
box.className.toggle("active");
console.log(box.classList.contains("active"));`,
          solutionCode: `const classes = new Set();
const box = {
  textContent: "",
  classList: {
    toggle: (c) => classes.has(c) ? classes.delete(c) : classes.add(c),
    contains: (c) => classes.has(c)
  }
};

box.textContent = "Ready";
box.classList.toggle("active");
console.log(box.classList.contains("active"));`,
          clue: 'Look at line 11: replace `box.className.toggle` with `box.classList.toggle`.',
          testDescription: 'box.classList.contains("active") returns true.',
          assertionScript: `
            if (!box.classList.contains('active')) return { ok: false, message: 'active class was not toggled on. Use box.classList.toggle("active").' };
            return { ok: true, message: 'Great! classList (not className) gives you .add(), .remove(), and .toggle().' };
          `,
        },
        quiz: [
          {
            id: 's4-l2-q1',
            question: 'Which property is best for safely setting plain text inside an HTML element?',
            options: ['.textContent', '.src', '.href'],
            correctIndex: 0,
            explanation: '`.textContent` sets the text inside an element without treating it as raw HTML.',
          },
          {
            id: 's4-l2-q2',
            question: 'What does `btn.classList.toggle("dark")` do if `"dark"` is ALREADY on the button?',
            options: ['Adds a second "dark" class', 'Removes "dark"', 'Throws an error'],
            correctIndex: 1,
            explanation: '`.toggle()` acts like a switch: if the class is present, it removes it; if absent, it adds it.',
          },
        ],
      },
      {
        id: 's4-l3',
        stageId: 'stage-4',
        order: 3,
        title: 'Listening to Events (addEventListener)',
        subtitle: 'Running code the instant a user clicks, types, or submits',
        estimatedMinutes: 6,
        simulatorId: 'event-wire',
        plainEnglish:
          '`element.addEventListener("click", function() { ... })` tells the browser: "Watch this button, and run my function every time someone clicks it."',
        realLifeAnalogy:
          'Like a doorbell: you wire it up once, and whenever a visitor presses the button, the chime function rings.',
        watchOutFor:
          'Pass the function itself (`handleClick`), NOT `handleClick()` with parentheses—adding `()` runs it immediately before the user even clicks!',
        codeExample: `const likeBtn = document.querySelector("#like-btn");

likeBtn.addEventListener("click", function () {
  likeBtn.textContent = "Liked!";
});`,
        fillGap: {
          prompt: 'Attach a `"click"` listener to `saveBtn` that updates `status.textContent`.',
          lines: [
            [
              { type: 'text', value: 'saveBtn.' },
              { type: 'blank', value: '', blankId: 'b1' },
              { type: 'text', value: '("' },
              { type: 'blank', value: '', blankId: 'b2' },
              { type: 'text', value: '", ' },
              { type: 'blank', value: '', blankId: 'b3' },
              { type: 'text', value: ' () {' },
            ],
            [{ type: 'text', value: '  status.textContent = "Saved!";' }],
            [{ type: 'text', value: '});' }],
          ],
          answers: {
            b1: 'addEventListener',
            b2: 'click',
            b3: 'function',
          },
          wordBank: ['addEventListener', 'click', 'function', 'onClick', 'hover'],
          hint: 'Use `.addEventListener("click", function () { ... })`.',
          explanation: '`addEventListener` waits for the `"click"` event and runs the callback `function` when triggered.',
        },
        debug: {
          prompt: 'The click handler fired immediately during setup instead of waiting for a click! Pass the function reference without calling it.',
          symptom: 'clickedCount became 1 before anyone clicked the button!',
          buggyCode: `let clickedCount = 0;
function onButtonClick() {
  clickedCount += 1;
}

// Simulated button registration
let registeredHandler = null;
function addClickListener(fn) {
  registeredHandler = fn;
}

addClickListener(onButtonClick());
console.log("Before click:", clickedCount);`,
          solutionCode: `let clickedCount = 0;
function onButtonClick() {
  clickedCount += 1;
}

// Simulated button registration
let registeredHandler = null;
function addClickListener(fn) {
  registeredHandler = fn;
}

addClickListener(onButtonClick);
console.log("Before click:", clickedCount);`,
          clue: 'Look at line 12: `onButtonClick()` has parentheses, which runs it immediately. Remove the `()`!',
          testDescription: 'Before click, clickedCount is 0 and registeredHandler is the function.',
          assertionScript: `
            if (clickedCount !== 0) return { ok: false, message: 'clickedCount is ' + clickedCount + ' before clicking! Remove () from onButtonClick().' };
            if (typeof registeredHandler !== 'function') return { ok: false, message: 'registeredHandler must be a function reference.' };
            return { ok: true, message: 'Perfect! Passing onButtonClick without () waits until the user actually clicks.' };
          `,
        },
        quiz: [
          {
            id: 's4-l3-q1',
            question: 'Which event fires every time a user types a character into an `<input>` box?',
            options: ['"input"', '"load"', '"resize"'],
            correctIndex: 0,
            explanation: 'The `"input"` event fires immediately whenever the text inside an input field changes.',
          },
          {
            id: 's4-l3-q2',
            question: 'Why do we write `btn.addEventListener("click", sayHi)` instead of `sayHi()`?',
            options: [
              'So sayHi waits until the click instead of running right away',
              'Because parentheses are banned in JavaScript',
            ],
            correctIndex: 0,
            explanation: 'Writing `sayHi()` calls the function immediately; passing `sayHi` hands the function recipe to the browser for later.',
          },
        ],
      },
    ],
    project: {
      id: 'proj-stage-4',
      stageId: 'stage-4',
      title: 'Stage 4 Mini-Project: Interactive Flashcard Studio',
      summary:
        'Combine HTML card markup, CSS visual highlight states, and Stage 4 DOM skills (`querySelector`, `classList.toggle`, `addEventListener`) to build a study deck.',
      whatYouCombine: 'HTML card + CSS flip/highlight classes + JS DOM selectors & click events',
      starterHtml: `<div class="deck">
  <p class="counter" id="cardCounter">Card 1 of 3</p>
  <div id="flashcard" class="flashcard">
    <p id="cardLabel" class="label">QUESTION</p>
    <h3 id="cardText">What keyword declares a variable that can change?</h3>
  </div>
  <div class="controls">
    <button id="flipBtn">Show Answer</button>
    <button id="nextBtn" class="secondary">Next Card</button>
  </div>
</div>`,
      starterCss: `.deck {
  max-width: 380px;
  margin: 0 auto;
  text-align: center;
}
.counter { font-size: 13px; color: #64748b; margin-bottom: 10px; }
.flashcard {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 16px;
  padding: 28px 20px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: background-color 0.2s, border-color 0.2s;
}
.flashcard.flipped {
  background: #eff6ff;
  border-color: #0284c7;
}
.label { font-size: 11px; letter-spacing: 0.08em; color: #0284c7; font-weight: 700; margin: 0 0 8px; }
h3 { margin: 0; font-size: 18px; color: #0f172a; }
.controls { display: flex; gap: 10px; margin-top: 14px; }
button {
  flex: 1;
  padding: 10px;
  background: #0284c7;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
button.secondary { background: #e2e8f0; color: #0f172a; }`,
      starterJs: `const cards = [
  { q: "What keyword declares a variable that can change?", a: "let" },
  { q: "What index is the first item in an array?", a: "0 (Zero)" },
  { q: "Which method attaches a click listener?", a: "addEventListener" }
];

let index = 0;
let showingAnswer = false;

const flashcard = document.querySelector("#flashcard");
const cardCounter = document.querySelector("#cardCounter");
const cardLabel = document.querySelector("#cardLabel");
const cardText = document.querySelector("#cardText");
const flipBtn = document.querySelector("#flipBtn");
const nextBtn = document.querySelector("#nextBtn");

function updateCard() {
  const current = cards[index];
  cardCounter.textContent = \`Card \${index + 1} of \${cards.length}\`;
  cardLabel.textContent = showingAnswer ? "ANSWER" : "QUESTION";
  cardText.textContent = showingAnswer ? current.a : current.q;
  flipBtn.textContent = showingAnswer ? "Show Question" : "Show Answer";
}

flipBtn.addEventListener("click", function () {
  showingAnswer = !showingAnswer;
  // TODO: toggle the "flipped" class on flashcard using classList.toggle
  updateCard();
});

nextBtn.addEventListener("click", function () {
  // TODO: advance index to the next card (wrap back to 0 at end)
  showingAnswer = false;
  flashcard.classList.remove("flipped");
  updateCard();
});

updateCard();`,
      solutionHtml: `<div class="deck">
  <p class="counter" id="cardCounter">Card 1 of 3</p>
  <div id="flashcard" class="flashcard">
    <p id="cardLabel" class="label">QUESTION</p>
    <h3 id="cardText">What keyword declares a variable that can change?</h3>
  </div>
  <div class="controls">
    <button id="flipBtn">Show Answer</button>
    <button id="nextBtn" class="secondary">Next Card</button>
  </div>
</div>`,
      solutionCss: `.deck {
  max-width: 380px;
  margin: 0 auto;
  text-align: center;
}
.counter { font-size: 13px; color: #64748b; margin-bottom: 10px; }
.flashcard {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 16px;
  padding: 28px 20px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: background-color 0.2s, border-color 0.2s;
}
.flashcard.flipped {
  background: #eff6ff;
  border-color: #0284c7;
}
.label { font-size: 11px; letter-spacing: 0.08em; color: #0284c7; font-weight: 700; margin: 0 0 8px; }
h3 { margin: 0; font-size: 18px; color: #0f172a; }
.controls { display: flex; gap: 10px; margin-top: 14px; }
button {
  flex: 1;
  padding: 10px;
  background: #0284c7;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
button.secondary { background: #e2e8f0; color: #0f172a; }`,
      solutionJs: `const cards = [
  { q: "What keyword declares a variable that can change?", a: "let" },
  { q: "What index is the first item in an array?", a: "0 (Zero)" },
  { q: "Which method attaches a click listener?", a: "addEventListener" }
];

let index = 0;
let showingAnswer = false;

const flashcard = document.querySelector("#flashcard");
const cardCounter = document.querySelector("#cardCounter");
const cardLabel = document.querySelector("#cardLabel");
const cardText = document.querySelector("#cardText");
const flipBtn = document.querySelector("#flipBtn");
const nextBtn = document.querySelector("#nextBtn");

function updateCard() {
  const current = cards[index];
  cardCounter.textContent = \`Card \${index + 1} of \${cards.length}\`;
  cardLabel.textContent = showingAnswer ? "ANSWER" : "QUESTION";
  cardText.textContent = showingAnswer ? current.a : current.q;
  flipBtn.textContent = showingAnswer ? "Show Question" : "Show Answer";
}

flipBtn.addEventListener("click", function () {
  showingAnswer = !showingAnswer;
  flashcard.classList.toggle("flipped");
  updateCard();
});

nextBtn.addEventListener("click", function () {
  index = (index + 1) % cards.length;
  showingAnswer = false;
  flashcard.classList.remove("flipped");
  updateCard();
});

updateCard();`,
      steps: [
        {
          id: 'p4-s1',
          title: 'Toggle flipped CSS class',
          instruction: 'Call `flashcard.classList.toggle("flipped")` inside `flipBtn` click.',
          checkPattern: 'flashcard\\.classList\\.toggle\\(',
          targetFile: 'js',
        },
        {
          id: 'p4-s2',
          title: 'Advance to next card',
          instruction: 'Update `index = (index + 1) % cards.length;` inside `nextBtn` click.',
          checkPattern: 'index\\s*=\\s*\\(?index\\s*\\+\\s*1',
          targetFile: 'js',
        },
      ],
    },
  },
  {
    id: 'stage-5',
    number: 5,
    title: 'Scope, Async & Real Data',
    level: 'Intermediate',
    summary:
      'Master where variables live (scope), why JavaScript never freezes while waiting (timers & async/await), and how to unpack JSON data safely.',
    visualImage: '/src/assets/images/stage_5_async_1795383142336.jpg',
    visualCaption:
      'The main conveyor keeps running smoothly while slower async tasks wait at the side dock and join the queue when ready.',
    lessons: [
      {
        id: 's5-l1',
        stageId: 'stage-5',
        order: 1,
        title: 'Scope: Where Variables Live',
        subtitle: 'Why inner rooms can see outside, but outside cannot see inside',
        estimatedMinutes: 6,
        simulatorId: 'scope-rooms',
        plainEnglish:
          'Scope controls where a variable is visible. Variables created inside a function `{ ... }` stay private to that function. Code inside a function CAN see outer (global) variables, like looking out a one-way tinted window.',
        realLifeAnalogy:
          'A tinted hotel room: from inside your room you can look out at the city skyline (global scope), but people on the street cannot see inside your private room (local scope).',
        watchOutFor:
          'Trying to read a variable outside the `{ }` block or function where it was declared causes a ReferenceError.',
        codeExample: `const appTitle = "ClearScript"; // Global scope

function showWelcome() {
  const secret = "42"; // Local scope inside function
  console.log(appTitle); // Works!
}
// console.log(secret); // ReferenceError outside!`,
        fillGap: {
          prompt: 'Return the computed `discount` out of the function instead of reading a local variable outside.',
          lines: [
            [{ type: 'text', value: 'const taxRate = 0.1;' }],
            [{ type: 'text', value: 'function getTax(amount) {' }],
            [
              { type: 'text', value: '  ' },
              { type: 'blank', value: '', blankId: 'b1' },
              { type: 'text', value: ' tax = amount * ' },
              { type: 'blank', value: '', blankId: 'b2' },
              { type: 'text', value: ';' },
            ],
            [
              { type: 'text', value: '  ' },
              { type: 'blank', value: '', blankId: 'b3' },
              { type: 'text', value: ' tax;' },
            ],
            [{ type: 'text', value: '}' }],
          ],
          answers: {
            b1: 'const',
            b2: 'taxRate',
            b3: 'return',
          },
          wordBank: ['const', 'taxRate', 'return', 'global', 'amount'],
          hint: 'Inside `getTax`, you can freely read `taxRate` from the outer scope, then `return` the result.',
          explanation: '`getTax` looks outward to read `taxRate`, computes `tax` locally, and returns it cleanly.',
        },
        debug: {
          prompt: 'This code tries to read `greeting` outside `makeGreeting()` and crashes with a ReferenceError. Return `greeting` and capture it!',
          symptom: 'ReferenceError: greeting is not defined.',
          buggyCode: `function makeGreeting(name) {
  const greeting = "Hi, " + name;
}

makeGreeting("Leo");
console.log(greeting);`,
          solutionCode: `function makeGreeting(name) {
  const greeting = "Hi, " + name;
  return greeting;
}

const result = makeGreeting("Leo");
console.log(result);`,
          clue: '`greeting` only exists inside `makeGreeting`. Add `return greeting;` and log the returned value!',
          testDescription: 'Logs "Hi, Leo" without a ReferenceError.',
          assertionScript: `
            if (__logs[0] !== 'Hi, Leo') return { ok: false, message: 'Expected console.log to print "Hi, Leo". Return greeting and log it!' };
            return { ok: true, message: 'Nice! Returning local values keeps functions clean and avoids ReferenceErrors.' };
          `,
        },
        quiz: [
          {
            id: 's5-l1-q1',
            question: 'Can a function read a `const` variable declared outside at the top of the file?',
            options: ['Yes, inner scopes can look outward', 'No, never'],
            correctIndex: 0,
            explanation: 'Inner blocks and functions have read access to variables in outer enclosing scopes.',
          },
          {
            id: 's5-l1-q2',
            question: 'What error do you get if you read a local variable outside its function?',
            options: ['TypeError', 'ReferenceError', 'SyntaxError'],
            correctIndex: 1,
            explanation: 'JavaScript throws a `ReferenceError` when a variable name does not exist in the current scope.',
          },
        ],
      },
      {
        id: 's5-l2',
        stageId: 'stage-5',
        order: 2,
        title: 'Callbacks & Timers (setTimeout)',
        subtitle: 'Running code later without freezing the page',
        estimatedMinutes: 6,
        simulatorId: 'async-harbor',
        plainEnglish:
          'JavaScript handles one main task at a time, so waiting tasks like `setTimeout(fn, 1000)` step aside to a waiting dock. The rest of your code keeps running immediately, and when the timer finishes, your callback function joins the line.',
        realLifeAnalogy:
          'Ordering coffee at a counter: you place your order and step to the pickup counter so the cashier can serve the next person immediately.',
        watchOutFor:
          'Even `setTimeout(fn, 0)` runs AFTER all synchronous lines below it finish first!',
        codeExample: `console.log("1. Start");

setTimeout(function () {
  console.log("3. Timer finished!");
}, 1000);

console.log("2. Keep moving");`,
        fillGap: {
          prompt: 'Schedule a message to log after 500 milliseconds using `setTimeout`.',
          lines: [
            [
              { type: 'blank', value: '', blankId: 'b1' },
              { type: 'text', value: '(' },
              { type: 'blank', value: '', blankId: 'b2' },
              { type: 'text', value: ' () {' },
            ],
            [{ type: 'text', value: '  console.log("Done waiting!");' }],
            [
              { type: 'text', value: '}, ' },
              { type: 'blank', value: '', blankId: 'b3' },
              { type: 'text', value: ');' },
            ],
          ],
          answers: {
            b1: 'setTimeout',
            b2: 'function',
            b3: '500',
          },
          wordBank: ['setTimeout', 'function', '500', 'wait', '0.5'],
          hint: '`setTimeout` expects milliseconds (500ms = half a second), not seconds.',
          explanation: '`setTimeout(callback, ms)` waits at least the given milliseconds without blocking the rest of your app.',
        },
        debug: {
          prompt: 'Someone wrote `setTimeout` with `2` thinking it meant 2 seconds, and put parentheses on `alertUser()` so it ran early! Fix the callback & delay.',
          symptom: 'Callback executes immediately instead of scheduling a function for 2000ms.',
          buggyCode: `let scheduledFn = null;
let scheduledMs = 0;

function fakeSetTimeout(fn, ms) {
  scheduledFn = fn;
  scheduledMs = ms;
}

function sendToast() {
  return "Toast shown!";
}

fakeSetTimeout(sendToast(), 2);
console.log(typeof scheduledFn, scheduledMs);`,
          solutionCode: `let scheduledFn = null;
let scheduledMs = 0;

function fakeSetTimeout(fn, ms) {
  scheduledFn = fn;
  scheduledMs = ms;
}

function sendToast() {
  return "Toast shown!";
}

fakeSetTimeout(sendToast, 2000);
console.log(typeof scheduledFn, scheduledMs);`,
          clue: 'Pass `sendToast` without `()` and use `2000` for 2 seconds (2000 milliseconds).',
          testDescription: 'scheduledFn is a function and scheduledMs is 2000.',
          assertionScript: `
            if (typeof scheduledFn !== 'function') return { ok: false, message: 'Pass sendToast without () so scheduledFn is a function.' };
            if (scheduledMs !== 2000) return { ok: false, message: 'Expected 2000 milliseconds (2 seconds), got ' + scheduledMs };
            return { ok: true, message: 'Spot on! Always pass the function reference and milliseconds to timers.' };
          `,
        },
        quiz: [
          {
            id: 's5-l2-q1',
            question: 'In what order do these log? `console.log("A"); setTimeout(() => console.log("B"), 0); console.log("C");`',
            options: ['A, B, C', 'A, C, B', 'B, A, C'],
            correctIndex: 1,
            explanation: 'Synchronous lines (`A` and `C`) always finish before any `setTimeout` callback (`B`) runs from the queue.',
          },
          {
            id: 's5-l2-q2',
            question: 'How many milliseconds are in 3 seconds?',
            options: ['300', '3000', '3'],
            correctIndex: 1,
            explanation: '1 second = 1,000 milliseconds, so 3 seconds = 3,000 ms.',
          },
        ],
      },
      {
        id: 's5-l3',
        stageId: 'stage-5',
        order: 3,
        title: 'Async / Await & JSON Data',
        subtitle: 'Fetching data cleanly and handling errors with try / catch',
        estimatedMinutes: 7,
        simulatorId: 'fetch-json',
        plainEnglish:
          'Modern JavaScript uses `async` and `await` so waiting for server data reads like normal top-to-bottom code. Wrap `await` inside `try { ... } catch (err) { ... }` so network hiccups never crash your page.',
        realLifeAnalogy:
          '`await` pauses only that async function while the delivery boat fetches your JSON parcel, and `try / catch` is the safety net underneath.',
        watchOutFor:
          'You can only use `await` inside a function marked `async`, and remember that `fetch()` needs TWO awaits: one for the response and one for `response.json()`.',
        codeExample: `async function loadQuote() {
  try {
    const res = await fetch("/api/quote");
    const data = await res.json();
    console.log(data.text);
  } catch (err) {
    console.log("Could not load quote.");
  }
}`,
        fillGap: {
          prompt: 'Complete this `async` data loader with `await` and a `catch` error safety net.',
          lines: [
            [
              { type: 'blank', value: '', blankId: 'b1' },
              { type: 'text', value: ' function getUser() {' },
            ],
            [{ type: 'text', value: '  try {' }],
            [
              { type: 'text', value: '    const user = ' },
              { type: 'blank', value: '', blankId: 'b2' },
              { type: 'text', value: ' fetchUser();' },
            ],
            [{ type: 'text', value: '    return user.name;' }],
            [
              { type: 'text', value: '  } ' },
              { type: 'blank', value: '', blankId: 'b3' },
              { type: 'text', value: ' (error) {' },
            ],
            [{ type: 'text', value: '    return "Guest";' }],
            [{ type: 'text', value: '  }' }],
            [{ type: 'text', value: '}' }],
          ],
          answers: {
            b1: 'async',
            b2: 'await',
            b3: 'catch',
          },
          wordBank: ['async', 'await', 'catch', 'defer', 'else'],
          hint: 'Mark the function `async`, pause for promises with `await`, and handle failures in `catch`.',
          explanation: '`async` unlocks `await` inside the function, and `try / catch` prevents uncaught errors.',
        },
        debug: {
          prompt: 'JSON text arrived from a server (`\'{"city":"Tokyo","temp":22}\'`), but we forgot `JSON.parse()` so `data.city` is `undefined`! Parse the JSON string.',
          symptom: 'data.city logs undefined because data is still a raw string.',
          buggyCode: `const jsonText = '{"city":"Tokyo","temp":22}';
const data = jsonText;

console.log(data.city);`,
          solutionCode: `const jsonText = '{"city":"Tokyo","temp":22}';
const data = JSON.parse(jsonText);

console.log(data.city);`,
          clue: 'Use `JSON.parse(jsonText)` on line 2 to convert the JSON string into a real JavaScript object.',
          testDescription: 'data.city equals "Tokyo" and logs "Tokyo".',
          assertionScript: `
            if (typeof data !== 'object' || data.city !== 'Tokyo') return { ok: false, message: 'data is still a ' + typeof data + '. Convert jsonText using JSON.parse(jsonText).' };
            return { ok: true, message: 'Awesome! JSON.parse turns raw JSON text into a usable JavaScript object.' };
          `,
        },
        quiz: [
          {
            id: 's5-l3-q1',
            question: 'What keyword must be placed on a function before you can use `await` inside it?',
            options: ['async', 'defer', 'wait'],
            correctIndex: 0,
            explanation: 'Only `async` functions allow the `await` keyword inside their body.',
          },
          {
            id: 's5-l3-q2',
            question: 'Why do we wrap `await` calls inside `try { ... } catch (err) { ... }`?',
            options: [
              'To make the network faster',
              'To gracefully catch errors and show a friendly fallback instead of crashing',
            ],
            correctIndex: 1,
            explanation: '`try / catch` catches rejected promises (like offline network errors) so your app stays responsive.',
          },
        ],
      },
    ],
    project: {
      id: 'proj-stage-5',
      stageId: 'stage-5',
      title: 'Stage 5 Capstone: Async Quote & Bookmark Board',
      summary:
        'Combine HTML dashboard cards, CSS clean grid layout, and Stage 5 JavaScript (`async/await`, `try/catch`, simulated API delay, and `localStorage` persistence).',
      whatYouCombine: 'HTML dashboard + CSS quote card + JS async/await + try/catch + saved bookmarks',
      starterHtml: `<div class="board">
  <div class="top-row">
    <h2>Daily Builder Quotes</h2>
    <button id="loadBtn">Load New Quote</button>
  </div>
  <div class="quote-box">
    <p id="quoteText">Click "Load New Quote" to fetch one asynchronously.</p>
    <p id="quoteAuthor" class="author"></p>
    <button id="saveBtn" class="save-btn">Save Favorite</button>
  </div>
  <h3>Saved Favorites (<span id="favCount">0</span>)</h3>
  <ul id="favList"></ul>
</div>`,
      starterCss: `.board {
  max-width: 400px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 20px;
}
.top-row { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
h2 { margin: 0; font-size: 17px; }
h3 { margin: 16px 0 8px; font-size: 14px; color: #334155; }
button {
  padding: 8px 12px;
  background: #0284c7;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.quote-box {
  margin-top: 14px;
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
}
#quoteText { margin: 0; font-size: 15px; font-weight: 500; }
.author { margin: 6px 0 12px; font-size: 13px; color: #64748b; }
.save-btn { background: #059669; }
ul { margin: 0; padding-left: 18px; font-size: 13px; color: #475569; }`,
      starterJs: `const fakeDatabase = [
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Simplicity is prerequisite for reliability.", author: "Edsger Dijkstra" },
  { text: "Every expert was once a confused beginner.", author: "ClearScript" }
];

const loadBtn = document.getElementById("loadBtn");
const saveBtn = document.getElementById("saveBtn");
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const favCount = document.getElementById("favCount");
const favList = document.getElementById("favList");

let currentQuote = null;
const favorites = [];

function fakeFetchQuote() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      const random = fakeDatabase[Math.floor(Math.random() * fakeDatabase.length)];
      resolve(random);
    }, 500);
  });
}

// Step 1: Make loadNewQuote an async function and await fakeFetchQuote()
function loadNewQuote() {
  quoteText.textContent = "Loading from server...";
  quoteAuthor.textContent = "";
  // TODO: add async/await + try/catch to set currentQuote and update DOM
}

loadBtn.addEventListener("click", loadNewQuote);

saveBtn.addEventListener("click", function () {
  if (!currentQuote) return;
  favorites.push(currentQuote.text);
  favCount.textContent = favorites.length;
  const li = document.createElement("li");
  li.textContent = currentQuote.text;
  favList.appendChild(li);
});`,
      solutionHtml: `<div class="board">
  <div class="top-row">
    <h2>Daily Builder Quotes</h2>
    <button id="loadBtn">Load New Quote</button>
  </div>
  <div class="quote-box">
    <p id="quoteText">Click "Load New Quote" to fetch one asynchronously.</p>
    <p id="quoteAuthor" class="author"></p>
    <button id="saveBtn" class="save-btn">Save Favorite</button>
  </div>
  <h3>Saved Favorites (<span id="favCount">0</span>)</h3>
  <ul id="favList"></ul>
</div>`,
      solutionCss: `.board {
  max-width: 400px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 20px;
}
.top-row { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
h2 { margin: 0; font-size: 17px; }
h3 { margin: 16px 0 8px; font-size: 14px; color: #334155; }
button {
  padding: 8px 12px;
  background: #0284c7;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.quote-box {
  margin-top: 14px;
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
}
#quoteText { margin: 0; font-size: 15px; font-weight: 500; }
.author { margin: 6px 0 12px; font-size: 13px; color: #64748b; }
.save-btn { background: #059669; }
ul { margin: 0; padding-left: 18px; font-size: 13px; color: #475569; }`,
      solutionJs: `const fakeDatabase = [
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Simplicity is prerequisite for reliability.", author: "Edsger Dijkstra" },
  { text: "Every expert was once a confused beginner.", author: "ClearScript" }
];

const loadBtn = document.getElementById("loadBtn");
const saveBtn = document.getElementById("saveBtn");
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const favCount = document.getElementById("favCount");
const favList = document.getElementById("favList");

let currentQuote = null;
const favorites = [];

function fakeFetchQuote() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      const random = fakeDatabase[Math.floor(Math.random() * fakeDatabase.length)];
      resolve(random);
    }, 500);
  });
}

async function loadNewQuote() {
  quoteText.textContent = "Loading from server...";
  quoteAuthor.textContent = "";
  try {
    const quote = await fakeFetchQuote();
    currentQuote = quote;
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = "— " + quote.author;
  } catch (err) {
    quoteText.textContent = "Could not load quote.";
  }
}

loadBtn.addEventListener("click", loadNewQuote);

saveBtn.addEventListener("click", function () {
  if (!currentQuote) return;
  favorites.push(currentQuote.text);
  favCount.textContent = favorites.length;
  const li = document.createElement("li");
  li.textContent = currentQuote.text;
  favList.appendChild(li);
});`,
      steps: [
        {
          id: 'p5-s1',
          title: 'Mark function async & await data',
          instruction: 'Use `async function loadNewQuote()` and `await fakeFetchQuote()`.',
          checkPattern: 'async\\s+function\\s+loadNewQuote[\\s\\S]*await\\s+fakeFetchQuote',
          targetFile: 'js',
        },
        {
          id: 'p5-s2',
          title: 'Add try/catch safety net',
          instruction: 'Wrap the `await` inside a `try { ... } catch (err) { ... }` block.',
          checkPattern: 'try\\s*\\{[\\s\\S]*catch\\s*\\(',
          targetFile: 'js',
        },
      ],
    },
  },
];

export const ALL_LESSONS = STAGES.flatMap((stage) => stage.lessons);

export function getLevelInfo(xp: number) {
  const levels = [
    { level: 1, title: 'Curious Starter', min: 0, max: 200 },
    { level: 2, title: 'Logic Builder', min: 200, max: 500 },
    { level: 3, title: 'Function Crafter', min: 500, max: 900 },
    { level: 4, title: 'DOM Architect', min: 900, max: 1400 },
    { level: 5, title: 'JavaScript Confident', min: 1400, max: 1925 },
  ];
  const current =
    [...levels].reverse().find((l) => xp >= l.min) || levels[0];
  const span = Math.max(1, current.max - current.min);
  const pct = Math.min(100, Math.round(((xp - current.min) / span) * 100));
  return { ...current, pct };
}
