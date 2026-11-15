# Harbourline Creative: The Strategy Challenge

A **complete, offline-capable, static classroom game** for BADM 470 Business Policy and Strategy at Capilano University. Based on the fictional *Harbourline Creative* teaching case (revised October 2026) and the Chapter 2 abbreviated case analysis process.

## What you get

- 6 interactive activities organized from case facts to recommendation:
  1. **Case Intelligence**: 7 four-option multiple-choice questions.
  2. **Framework Lab**: 3 drag-and-drop matching rounds, 4 concepts each.
  3. **Connect the Dots**: 3 clickable two-column matching rounds, 4 pairs each. Connecting lines on larger screens.
  4. **Truth or Assumption?**: 6 true/false questions.
  5. **The Boardroom**: 5 strategic scenarios with 4 decisions and explicit consequences each.
  6. **90-Day Mission**: 3 priority-ranking rounds with 5 drag-sortable decisions each.
- Hidden answers until **Check**, **Submit**, or **Reveal** is selected.
- Facilitator drawer: direct navigation, answer reveal, per-round and per-module reset, timer, projector readability mode, full-screen, and manually managed 2–4 team scoreboard.
- Auto XP for checked work, manual team points for discussion quality.
- Local progress preservation via browser `localStorage`, no accounts or database.
- Responsive design, projector-sized typography, keyboard-first alternatives for drag interactions, and reduced-motion support.

## Why this implementation is dependency-free

The original request preferred React/TypeScript/Vite but explicitly allowed another suitable approach. This release uses **plain modern JavaScript ES modules and CSS** for maximum classroom reliability: no npm packages, no bundler, no API keys, no CDN assets, no build steps, and immediate GitHub Pages deployment. You can edit a question and refresh immediately. All buttons and activities run in the browser. Drag-and-drop uses native pointer events, with equivalent click/tap and up/down controls for mobile and keyboard users.

## Project structure

```
harbourline-strategy-challenge/
  index.html          # Site entry page
  styles.css          # The complete responsive design
  app.js              # State, activities, navigation, facilitator and drag behavior
  data/
    activities.js     # All activity questions, correct answers and discussion prompts
  assets/
    favicon.svg       # Simple HC favicon
  README.md           # This document
```

## Run locally (beginner-friendly)

**Option A — Python (recommended)**

1. Download and unzip the project.
2. Open Terminal (Mac/Linux) or PowerShell (Windows) in the extracted folder.
3. Run `python3 -m http.server 8000` (or `python -m http.server 8000` on Windows).
4. Open **http://localhost:8000/** in Chrome, Safari, Firefox or Edge.
5. When finished, press `Ctrl+C` in the terminal.

**Option B — VS Code**: Open the folder, install the free *Live Server* extension, then choose **Open with Live Server** on `index.html`.

Do not open `index.html` directly via `file://` because browsers normally block local JavaScript module imports. Use one of the methods above.

## Publish to GitHub Pages — step by step

No GitHub Actions workflow is needed, because the site is already static HTML, JavaScript and CSS.

1. Sign into [GitHub](https://github.com/).
2. Select **New repository**, name it `harbourline-strategy-challenge`, and create it as **Public**. You can choose a different name.
3. Open the new repository, choose **Add file → Upload files**, and drag all of the *contents* of this extracted project folder onto the upload area. Confirm that `index.html`, `app.js`, `styles.css`, `data/activities.js`, and `assets/favicon.svg` are at their proper paths. Do **not** add an extra outer folder in the repository.
4. Commit the files to the repository's `main` branch.
5. In the repository, open **Settings → Pages**.
6. Under **Build and deployment**, select **Deploy from a branch**. Choose the **main** branch and folder **/(root)**. Click **Save**.
7. After GitHub finishes publishing, visit `https://YOUR-USERNAME.github.io/harbourline-strategy-challenge/` using your GitHub username and repository name. You can also follow the published link displayed in **Settings → Pages**.
8. Make a small edit and commit it to update the public website. You may need to refresh the page to see the newest version.

For a private repository, GitHub Pages eligibility depends on your plan; a Public repository avoids that issue for most student accounts. Check the current GitHub Pages settings on your account.

## Edit or add questions

Open `data/activities.js`. It exports these arrays:

- `quiz`: Each question has `id`, `difficulty`, `kind`, `question`, four `options`, numeric `answer` (0=A, 1=B, 2=C, 3=D), `explanation`, `discussion`, `source`.
- `dragRounds`: Each set has `id`, `terms` and `targets`. A concept and its correct target **must share the same `id`**. You can rearrange the `targets` array to make the answers appear in a different order.
- `pairRounds`: Each set has `left` and `right` items, again paired through shared `id`. Mix the display order of the `right` array to create the challenge.
- `trueFalse`: Each has `statement`, Boolean `answer`, `explanation`, `discussion`, and `source`.
- `decisions`: Each scenario has `scene`, `question`, 4 options with `id`/`label`/`consequence`, and `preferred` set to one option's `id`. These are **recommended paths to discuss**, not universally correct answers.
- `rankRounds`: Every `initial` and `suggested` array should contain all 5 item IDs exactly once. `suggested` is **illustrative**, not a compulsory correct order.

Keep every `id` unique **within its activity array**, even if you edit question text. The IDs are local-progress keys. If you reuse an old ID for a substantially different item, reset the game in the facilitator drawer so old completion state doesn't follow the new question.

Example new quiz item (add a comma before or after as appropriate):

```js
{
  id: 'q8', difficulty: 'Medium', kind: 'Case interpretation',
  question: 'What would make a proposed advice fee more credible?',
  options: ['More unverified AI posts', 'A clear client problem and evidence plan', 'A guaranteed sale', 'No disclosure'],
  answer: 1,
  explanation: 'A scoped objective and credible evidence explain the agency contribution.',
  discussion: 'What would the finance manager need to see?',
  source: 'Case pp. 2, 5–6'
},
```

## Facilitation tips

- Start with the evidence rounds before making recommendations. This follows **performance → external/internal environment → SWOT and issue → alternatives → recommendation**.
- Students can discuss answers openly while the teacher leaves the correct choice hidden.
- Open **Facilitator** for the timer, navigation and reveal controls. There is no forced auto-reveal when time expires.
- Turn on **Team competition** and manually award 10 or 50 points for reasoning supported by evidence. Auto XP is an optional shared session score and is **not** tied to the teams.
- For the strategy and ranking rounds, ask for at least one strong argument against the suggested choice. These are contestable judgments.
- Enable **Projector readability mode** in Facilitator controls for larger question text, then use the built-in full-screen icon.
- For live backup, keep this folder on the laptop. Even if internet access drops, the site still runs locally via the free Python server.

## Source and integrity

All Harbourline-specific facts derive from *Harbourline Creative: Creating and delivering value in the age of AI*, BADM 470 Case Facilitation #5, revised October 6, 2026; it is a **fictional teaching case**. Strategy frameworks refer to Anderson, L., Buengel, D., & Simpson, J. J. (2025), *Strategic Management and Case Analysis: An Integrated Approach*, Virginia Tech Publishing, chapters 2–6.

The game labels case observations separately from strategic recommendations. The case provides **no financial statements**, and the game intentionally avoids invented financial metrics, guaranteed outcomes, or claims that the client's stated interest proves purchase demand. Page references appear after checking answers.

## Data & privacy

The game makes no network requests. Progress, selections, timer preferences and team names/scores are stored locally in this browser's `localStorage`. Closing and reopening keeps progress; opening the site on another computer starts a new session. **Facilitator → Reset entire game** clears it on that device. Avoid putting personal student data into team names.

## Browser support

Recent Chrome, Edge, Firefox and Safari support JavaScript modules, CSS Grid, Pointer Events and localStorage. Touch dragging uses pointer input; if touch drag is awkward on a specific device, use tap-to-match and the ranking arrows instead.