---
name: new-template
description: Create a new wedding-invitation template (tNN) for the my-wed gallery, design first: the owner picks a story, Claude picks a medium, photo frame, intro, layout, type and palette that suit it and differ from every existing template, draws one coherent art kit with AI and gets it approved, renders a mockup of the phone screens and gets it approved, and only then builds the template to match. Use when the user asks to create, add, or make a new template/mẫu thiệp (with or without a design image), or to redo an existing template's design.
---

# new-template (v2: design first, varied by theme)

The previous version (build straight from a design image) is archived in `docs/archive/new-template-skill-v1.md`.
Read `docs/design-guide.md` (rules + section 9, the menus) and `docs/templates-register.md` (what each template already uses) before step 1.

Talk to the owner in Vietnamese, briefly. Never deploy. Two review gates (art kit, mockup); the owner only reviews, Claude does all the work. No video unless asked.

**Nothing below is a fixed style.** Every template picks its own medium, photo frame, intro, layout, type pair, background and colour from the menus to suit its story. t28 (watercolour, painted-edge photos, fan) is one example, not a default.

## Preconditions

1. Pick the next free id from `my-wed/src/templates/index.ts`.
2. AI art credentials (environment first, else scratchpad files; never commit or print them): `CF_TOKEN` + `CF_ACCOUNT` (Cloudflare Workers AI, scratchpad `cf/`) and `DEAPI_KEY` (deAPI, scratchpad `deapi/key`). Both serve the same model, FLUX.2 [klein] 4B, so kits stay consistent; `ai_art.py` uses Cloudflare first and switches to deAPI on its quota error. If neither exists, ask the owner to add them to the environment settings.
3. Budget, free tiers only (the owner does not want paid plans): Cloudflare about 90 images/day (resets 00:00 UTC), deAPI 100 images/day at 3 per minute from the $5 signup credit. A kit is usually 8–12 images including retries. If both run out, say so and continue the next day.
4. Dev server for steps 4–5: `cd my-wed && npx zmp start -nF -P 3100`.

## Step 0: story (one question round)

If the owner already named a story or gave a design image, derive everything. Otherwise AskUserQuestion, one round: story (4 suggestions across different groups and media, none already in the register), and optionally colour. Do not ask about medium, frame or layout unless the owner wants to choose: Claude proposes them in step 1.

## Step 1: brief, one line per dimension

Pick from `docs/design-guide.md` section 9 to suit the story:
group · story · **medium** (with its STYLE line) · **photo frame** · **intro** · **layout** · **type pair** · **background** · **palette** (hex and shares; the medium may override the default colour rules) · art list (hero, corner/accents, divider, gift item, footer, intro object(s), masks or frames if the photo frame needs drawn art).

Diversity check before going on: compare with every row of `docs/templates-register.md`; the new template must differ from each row in at least 4 of: medium, photo frame, intro, layout, type pair, background, main colour. If not, change dimensions until it does. Show the brief and the check in a few lines, then continue without waiting.

## Step 2: art kit, then STOP for review

1. Draw each piece: `python3 scripts/design/ai_art.py design/tNN/art/<name>.webp <w> <h> "<STYLE> <subject, plain background, no text, no frame>"`. Art on a dark ground (lacquer, gold leaf): add `--paper dark` and ask for "on pure black background". Painted photo masks: `--mask design/tNN/art/<name>.png <w> <h> "<shape + medium>"`.
2. Every art file is a **transparent WebP** (the script converts the paper or black ground to alpha). Exception: a scene that fills a whole section as its background may stay opaque. Never `mix-blend-mode: multiply` (Zalo iOS shows the paper).
3. One medium for the whole kit, same STYLE prefix on every piece. Re-draw pieces that are off-style or wrong (AI often fails "closed / folded" objects: try variations).
4. Background texture if needed: `python3 scripts/design/paper.py`.
5. `python3 scripts/design/board.py design/tNN/art <scratchpad>/tNN-board.jpg <background>`, run the self-check in the guide's section 10 (art lines), then send the board. **Stop and wait** for approval; re-draw on comments.

## Step 3: mockup from the approved kit, then STOP for review

1. Copy `scripts/design/mockup-starter.html` to `design/tNN/mockup.html`; lay out the screens in the chosen layout (intro closed, intro opened, first screen, families/invite, date/venue, album (1–2 screens), calendar/countdown/programme, RSVP/gift, thanks) using only the kit, demo photos and the brief's tokens and fonts.
2. Rules: a piece drawn cropped by an edge keeps that edge outside the screen; one photo frame for every photo, variety only from size and arrangement; corner art never covers text; one decoration family repeated.
3. `node scripts/design/mockup.mjs design/tNN/mockup.html <scratchpad>/tNN-mockup.jpg` (served over http, so CSS masks work), look at every screen at full size, go through the whole self-check in the guide's section 10 and `palette.py`, and fix everything it finds before sending. The goal is approval in one or two rounds, not five.
4. Send the image with a few lines. **Stop and wait** for "duyệt"; apply comments and re-send as many rounds as needed.

## Step 4: build to match the mockup (after approval only)

- Files: `templates/tNN/index.tsx`, `styles.scss`, `demo-data.ts`; art copied to `src/static/tNN/`; thumbnail `src/static/thumbs/tNN.jpg` (copy `tNN-thumb.jpg` that `shots.mjs` writes; run shots once the page renders). Register at the end of `templates/index.ts`; add the intro's tap target to `OPENERS` in `scripts/design/browser.mjs`; add the template and its photo slots to `admin/src/catalog.ts`.
- Follow the guide's section 11 (Zalo WebView: no mix-blend-mode, no :has(), -webkit-mask prefixes).
- Copy the mockup's tokens unchanged. Reuse `_kit` (Reveal, CalendarCard, Countdown, RsvpForm, GiftCard, VenueActions, GuestName, LunarNote, photoSrc, photoShape) and restyle in SCSS. All features of the guide's section 7 present. Never edit `src/core/`.
- The album handles any number of photos (landscape vs portrait via `photoShape`).
- `npx -y -p typescript@5.6.3 tsc --noEmit -p .` passes (and `cd admin && npx vite build` if the catalog changed).

## Step 5: screenshots, register, hand-off

1. `node scripts/design/shots.mjs tNN <scratchpad>/tNN`, compare with the mockup, fix (at most 2 rounds), re-check `palette.py`.
2. Add the template's row to `docs/templates-register.md` and its art sources to `docs/CREDITS.md`.
3. Send the screenshot strip (no video) and a short report.
4. Commit on `main`, push, sync `claude/commit-folder-to-repo-lnvcke` (CLAUDE.md). Art, mockup HTML, template, register are committed; rendered images are not. Remind the owner that the mini app (and admin, if changed) needs a deploy, and deploy only when told.
