---
name: new-template
description: Build a new wedding-invitation template (tNN) for the my-wed gallery from a design image. Use when the user provides a design image and asks to create, add, or make a new template/mẫu thiệp. Follows a fixed process (tokens, sections, build, screenshot compare) so results match the image and don't drift.
---

# new-template

Turn one design image into one template in `my-wed/src/templates/tNN/`. Follow the steps in order. Do not skip the screenshot comparison. Do not deploy: deploying only happens when the user says so.

## Preconditions (check first, stop and tell the user if any fails)

1. The target structure exists: `my-wed/src/core/` (shared hooks, utils, types) and `my-wed/src/templates/` (with `index.ts` registry). If not, the restructure is not done yet. Stop and say so; do not build a template in the old layout.
2. The user gave a design image (long screenshot or per-section images). If not, ask for it.
3. Pick the next free id (`t02`, `t03`, ...) from `templates/index.ts`. Confirm the id with the user only if they named one.

## Scope rules (these prevent drift)

- A template is only UI: its own JSX, its own SCSS, its own demo data. Nothing else.
- Never edit `src/core/`. If the design needs a feature the core does not have, do not add it: list it in the final report and ask.
- Every template must implement the shared template contract (the `WeddingData` type from `core/`), so all templates get the same features: countdown, map directions, add to calendar, RSVP, gift accounts, album, timeline. If the design has no place for a feature, say so in the report; do not silently drop it.
- Use real text from the design only as demo data. Never invent extra sections.
- Fonts: prefer `@fontsource/*` packages already installed; if the design uses another font, add the matching `@fontsource` package and tell the user.
- Images: the user supplies photos. Until then use placeholders (`buildPlaceholder`), never hotlink external images.

## Process

1. **Read the image carefully.** Look at every section top to bottom.
2. **Write tokens first** in `templates/tNN/styles.scss` as CSS variables scoped to the template root (e.g. `.tNN-root { --c-bg; --c-ink; --c-accent; --font-display; --font-body; --radius; --space-* }`). Sample colors from the image; state any guess as a guess in the report.
3. **List sections** in order with the shared feature each maps to (write this list in the report, one line each).
4. **Build section by section** in `templates/tNN/index.tsx`, reusing hooks from `core/`. Keep each section a small component in the same folder.
5. **Register** the template in `templates/index.ts` (id, display name, thumbnail, demo data).
6. **Verify**: run `npm run typecheck`/`tsc` style checks the repo uses, then start the app (`zmp start` or the Vite dev server), open the template route with Playwright at **390px width**, take a full-page screenshot into the scratchpad, and compare it side by side with the design image.
7. **Fix differences, at most 2 rounds.** Priorities: layout and spacing, then type, then color, then decoration. Stop after 2 rounds even if small differences remain; list them.

## Acceptance

- Typecheck passes, no console errors on load.
- The 390px screenshot matches the design's structure, spacing and palette closely; remaining differences are listed.
- All shared features present or explicitly reported as missing.
- `git status` shows changes only under `templates/tNN/` and the registry file.

## Final report (keep it short)

- Template id and files created.
- Section list with mapped features.
- Screenshot path and the remaining differences.
- Anything guessed (colors, fonts) and anything that needs the user (missing feature, fonts, photos).

Do not commit, push, or deploy unless the user asks.
