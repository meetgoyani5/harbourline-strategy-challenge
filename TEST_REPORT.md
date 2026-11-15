# Testing Report

Tested on November 14, 2026 against the included source files.

## Passed checks

- JavaScript syntax checks for `app.js` and `data/activities.js`.
- Home page renders all 6 activity cards at desktop and mobile widths.
- Quiz choice remains hidden until checking; green/red feedback and XP are shown after checking.
- True/false choice, checking and answer highlighting.
- Pointer drag AND tap-to-select placement in the drag-to-match activity.
- Two-column matching and connecting-line drawing.
- Strategic decision reveals all 4 consequences and the recommended, contestable path.
- Ranking reorders with both arrow buttons and pointer dragging; proposed ranking appears only after submission.
- Facilitator controls: module switching, team competition toggle, manual +50 score changes, answer reveal that preserves already-earned XP.
- Timer starts, counts down and pauses.
- Local-storage progress serialization and restoration in a new page session.
- Mobile at 390px: no horizontal overflow and no JavaScript errors.
- No runtime JavaScript errors during the above tests.

## Test environment limitations

This working environment blocks direct Chromium URL navigation via an administrator policy. Browser tests therefore loaded the exact CSS and JavaScript from the project directly into the browser page, with the ES module import/export boundary adapted only in the test harness. Syntax and file paths were checked separately. The GitHub Pages deployment itself and the browser full-screen API were not exercised in this environment. They should be smoke-tested on the target classroom laptop after publishing.

## Final classroom checklist

1. Open the published GitHub Pages URL and verify the first quiz.
2. Test full-screen and projector readability mode on the presentation laptop.
3. Try the matching and ranking activities with mouse/touch or use their keyboard alternatives.
4. Confirm the facilitator dashboard and any desired team names.
5. Keep a local copy and Python HTTP server available as a no-internet backup.