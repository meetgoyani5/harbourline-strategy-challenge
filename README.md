# Harbourline Creative — Facilitator-Led Strategy Challenge

Interactive static website for Capilano University BADM 470, based on the fictional Harbourline Creative case and Chapters 2–7.

**Live site:** https://meetgoyani5.github.io/harbourline-strategy-challenge/

## Classroom workflow

1. Distribute the **2-page case overview** and **4-page student handouts** (separately, as activities begin).
2. Give groups time to analyze and write their own answers **before** displaying the facilitator’s interpretation.
3. Ask a group to present a short answer, then use the website to classify, compare, or reveal supporting evidence.
4. **Correct answer: +1 point.** The next group gets the following turn. **Incorrect answer: 0 points**, an optional wrong-answer tone, and the question passes to another group. The facilitator controls correctness for open-ended answers.
5. Reveal the winning group on the final results screen; ties can be broken with one evidence-based follow-up.

## Updated activity sequence

| Step | Activity |
| --- | --- |
| 01 | Opening 15-question case-facts quiz and qualitative performance discussion |
| 02 | Large-card PESTEL category selection, cumulative PESTEL summary; Porter’s Five Forces drag-and-drop + pressure ratings |
| 03 | **Internal Analysis**: student-submitted resource/capability tiles for other groups to classify; 6 sequential VRIO resources |
| 04 | Drag-and-drop SWOT, including unsupported claims |
| 05 | Groups shortlist 5 concerns on paper; facilitators enter 1 concern per group into a shared pool |
| 06 | Symptoms vs. strategic concerns vs. proposed solutions sorting; groups independently write a strategic-issue sentence |
| 07 | Group analysis of three distinct alternatives: affordable AI-assisted production, strategic advice only, hybrid strategy + production |
| 08 | Class recommendation vote, then optional team interpretation and bounded 90-day pilot |
| 09 | Line-of-sight / unsupported-claim challenge |
| 10 | Winning-group leaderboard, brief closing question and prize |

The old strategic group mapping activity and overlapping opening analysis slides were removed.

## Controls and privacy

- **Facilitator** menu: change group count (2–4), rename groups, manually adjust scores **+1 / −1**, set the current turn, control the timer, and navigate stages.
- **Correct +1** / **Wrong → Pass** controls appear above each activity. One round cannot be awarded repeatedly until its item/question changes.
- Students' short answers in the Resources and Concerns sections are typed on the facilitator device. Browser spellcheck can flag typos, but it is **not an AI grammar-grading service**. Facilitators should review spelling and content and decide when alternative classifications are valid.
- One facilitator device runs the game. The site stores class inputs and scores in the current browser’s **localStorage**; it does not have an online multiplayer server.
- PESTEL, SWOT, resource/capability and symptoms/concerns/solutions support tap/click, with drag-and-drop on desktop.
- A wrong-answer tone depends on a user interaction and browser audio support.

## Start and publish

Run locally with `python3 -m http.server 8000`, then open `http://localhost:8000`. ES modules generally require a local web server rather than `file://`.

For GitHub Pages use **Settings → Pages → Deploy from branch → main / (root)**, or the bundled GitHub Actions Pages workflow.

## Content and source

`data/activities.js` contains the editable case questions, facts, explanations and alternative models. `app.js` handles interactions; `styles.css` controls appearance.

The case does not supply financial statements, representative survey estimates or enough competitor data for invented numerical analysis. Treat VRIO unknowns and PESTEL gaps as real limits. Alternative conclusions can be valid if logically justified.

*Harbourline Creative: Creating and delivering value in the age of AI.* Fictional BADM 470 case, revised October 6, 2026. Retain its own required disclosure and source acknowledgement when distributing the case. Course framework: Anderson, Buengel, & Simpson (2025), *Strategic Management and Case Analysis: An Integrated Approach*, Virginia Tech Publishing, https://doi.org/10.21061/strategicmanagementandcaseanalysis.
