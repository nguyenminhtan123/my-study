---
name: new-template
description: Create a new wedding-invitation template (tNN) for the my-wed gallery, design first: the owner picks a design group and story, Claude draws one coherent art kit with AI and gets it approved, renders a mockup image of the phone screens and gets it approved, and only then builds the template code to match. Use when the user asks to create, add, or make a new template/mẫu thiệp (with or without a design image), or to redo an existing template's design.
---

# new-template (v2: design first)

The previous version (build straight from a design image) is archived in `docs/archive/new-template-skill-v1.md`.
Read `docs/design-guide.md` before step 1: design groups, the 5 layers, colour/type rules, the art rules learned on t28, the 10-point check.

Talk to the owner in Vietnamese, briefly. Never deploy. There are two review gates (art kit, mockup); the owner only reviews, Claude does all the work. No video unless the owner asks.

## Preconditions

1. `my-wed/src/core/` and `my-wed/src/templates/index.ts` exist. Pick the next free id from `templates/index.ts`.
2. AI art: Cloudflare Workers AI credentials in the scratchpad (`cf/token`, `cf/account`), exported as `CF_TOKEN` / `CF_ACCOUNT` for `scripts/design/ai_art.py`. Never commit them. If missing, ask the owner (dash.cloudflare.com → AI → Workers AI → Use REST API → token + Account ID).
3. The dev server can run (`cd my-wed && npx zmp start -nF -P 3100`) for step 4.

## Step 0: the owner chooses (one question round)

If the owner already named a group/story or gave a design image, derive the choices. Otherwise AskUserQuestion, one round: design group (A–E), story (3 suggestions from the guide not used yet), main colour (3 muted options with hex), intro (one no other template uses). Ask the group alone first if it is unknown.

## Step 1: brief (about 10 lines, in the reply)

Story, group, palette with hex and shares, fonts, first-screen layout, section frame style, background, the art at divider / gift / footer, intro, and the art list (each piece and what it shows).

## Step 2: art kit, then STOP for review

1. Write one STYLE line (medium, paper, palette, mood, "no text, no frame, plain paper background") and prefix it to every piece. One medium per template: never mix photo cut-outs, watercolour and vector.
2. Draw each piece with `python3 scripts/design/ai_art.py design/tNN/art/<name>.webp <w> <h> "<STYLE> <subject>"` (FLUX.2 klein, Apache 2.0). The script turns the paper transparent: **every art file is a transparent WebP**, never an image with a white or paper background. Usual kit: hero (art that pours in from an edge), corner, divider, gift item, footer scene, intro object(s), photo masks (`wash-*.png`, painted shapes turned into alpha) if photos get a painted edge.
3. Re-draw any piece that is off-style or wrong (AI often gets "closed"/"folded" objects wrong: try a few variations).
4. Compose a board of the pieces laid on the page background and send it (SendUserFile). **Stop and wait** for approval; re-draw on comments.

## Step 3: mockup from the approved kit, then STOP for review

1. Copy `scripts/design/mockup-starter.html` to `design/tNN/mockup.html`; lay out the screens (intro closed, intro opened, first screen, families/invite, date/venue, album, calendar/countdown/programme, RSVP/gift, thanks) using only the kit, the demo photos and the brief's tokens.
2. Art rules: art is transparent WebP placed normally (no `mix-blend-mode: multiply`: Zalo's iOS WebView shows the white paper); a piece drawn cropped by an edge keeps that edge outside the screen; **one photo treatment for every photo** (e.g. all painted-edge masks), variety only from size and stagger; one decoration family repeated, not many.
3. Render `node scripts/design/mockup.mjs design/tNN/mockup.html <scratchpad>/tNN-mockup.jpg`, check it yourself, measure with `python3 scripts/design/palette.py`, fix once.
4. Send the mockup image with a few lines (what each screen shows, colour numbers). **Stop and wait.** Do not write template code until the owner says "duyệt"; apply comments and re-send as many rounds as needed.

## Step 4: build to match the mockup (after approval only)

- Files: `templates/tNN/index.tsx`, `styles.scss`, `demo-data.ts`; art copied to `src/static/tNN/`; thumbnail `src/static/thumbs/tNN.jpg` (360x640 from the first screen). Register at the end of `templates/index.ts`; add the intro's tap target to `OPENERS` in `scripts/design/browser.mjs`.
- Copy the mockup's tokens and art rules unchanged. Reuse `_kit` (Reveal, CalendarCard, Countdown, RsvpForm, GiftCard, VenueActions, GuestName, LunarNote, photoSrc, photoShape); restyle them in the template's SCSS. All shared features from the guide's section 7 must be present. Never edit `src/core/`; ask if the design needs it.
- The album must handle any number of photos (landscape vs portrait via `photoShape`).
- `npx -y -p typescript@5.6.3 tsc --noEmit -p .` must pass.

## Step 5: final screenshots and hand-off

1. `node scripts/design/shots.mjs tNN <scratchpad>/tNN` and compare with the mockup; fix differences (at most 2 rounds), re-measure with `palette.py`.
2. Send the screenshot strip (no video) and a short report: what was built, colour numbers, anything left.
3. Commit on `main`, push, then sync `claude/commit-folder-to-repo-lnvcke` (see CLAUDE.md). Art, mockup HTML and the template are committed; rendered mockup images and screenshots are not.
