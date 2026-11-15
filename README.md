# Harbourline Creative — The Strategy Challenge

A **static, facilitator-controlled website** for Capilano University BADM 470 Case Facilitation #5. The activities follow the abbreviated Chapter 2 case analysis sequence, applying Chapters 3–7. This version replaces the old game-type menu with ten connected case-analysis steps.

## Run the website

- For local use, open a terminal in this folder and run `python3 -m http.server 8000`, then open <http://localhost:8000>.
- The `index.html` uses native ES modules; running a local server is more reliable than opening it via `file://`.
- In GitHub Pages, publish the repository from `main` → `/(root)` **or** use the included Actions workflow (choose one Pages source).
- Project URL: <https://meetgoyani5.github.io/harbourline-strategy-challenge/>. GitHub Pages requires a successful deployment before the URL becomes live.

## Facilitation plan — 95 minutes

| Step | Activity | Minutes |
| --- | --- | ---: |
| Opening | Case framing and game instructions | 3 (on homepage) |
| 01 Performance | 15 case-understanding questions; identify 3 performance concerns | 12 |
| 02 External | PESTEL sentences, Five Forces classification and strength, strategic group mapping | 15 |
| 03 Internal | 10 resource/capability flip cards; 6 sequential VRIO exercises | 15 |
| 04 SWOT | 16-card drag-and-drop SWOT with unsupported category | 10 |
| 05 Strategic concerns | Select 5 from 12 statements | 7 |
| 06 Strategic issue | Paper handout, group statement, reveal proposed issue | 7 |
| 07 Alternatives | Paper handout, then compare three alternatives side-by-side | 10 |
| 08 Recommendation | Class vote, reveal suggested choice, 90-day plan | 6 |
| 09 Line of sight | Trace evidence to execution and spot unsupported leap | 6 |
| 10 Debrief | Three reflection questions and final takeaway | 4 |

## Key controls

The **Facilitator** button provides navigation, fullscreen, projector mode, a pauseable timer, optional team scoring and a reset. Answers and suggested interpretations are hidden until **Check / Reveal** is pressed. Local browser storage remembers scores, card selections, votes and progress. There is no backend or shared live multiplayer; participants discuss and the facilitator controls one projector computer.

Mobile-friendly controls: PESTEL, VRIO and concerns use tap/click. SWOT supports native HTML5 drag and drop **and** tap a card followed by its category, which works on touchscreens. Strategic group mapping supports drag/drop from the provider list, or tap a provider then tap the map. Handouts print from browser pop-ups; allow pop-ups to print.

## Editing content

- `data/activities.js`: editable data object exported as `content`, including `quiz`, `pestel`, `forces`, `resources`, `vrio`, `swot`, `concerns`, and `alternatives`.
- `app.js`: view and interaction logic.
- `styles.css`: appearance and projector/mobile styles.
- `index.html`: page metadata.

Please use only case-supported facts and label an inference or hypothetical question. Chapter 3 financial ratios cannot be calculated without financial statements. Five Forces and group-map estimates are discussion judgments rather than verified industry measurements. VRIO unknowns should remain explicitly unknown.

## Publish with GitHub Pages

1. Sign in to GitHub and visit the repository.
2. Under **Settings → Pages → Build and deployment**, choose **Deploy from branch**, branch `main`, folder `/(root)`, and save. This simple static configuration doesn't require a Node build.
3. Alternatively, select **GitHub Actions** and use `.github/workflows/deploy.yml`; do not expect both deployment modes to run simultaneously.
4. Check the **Actions** tab for a successful deployment, then open the project URL. A 404 usually means Pages has not yet published or the branch/folder is wrong.
5. Verify the homepage, quiz check/reveal, SWOT drag and tap, VRIO steps and printable handouts before class.

## Source attribution

*Harbourline Creative: Creating and delivering value in the age of AI.* BADM 470 Case Facilitation #5, fictional teaching case, revised October 6, 2026. The case may be edited and used for educational purposes; retain its disclosure and source acknowledgement with distributed copies. Course framework: Anderson, L., Buengel, D., & Simpson, J. J. (2025). *Strategic Management and Case Analysis: An Integrated Approach*. Virginia Tech Publishing. https://doi.org/10.21061/strategicmanagementandcaseanalysis