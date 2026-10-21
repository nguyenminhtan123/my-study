---
name: new-template
description: Create a new wedding-invitation template (tNN) for the my-wed gallery, design first: the owner picks a design group and story, Claude writes a short brief, renders a mockup image of the phone screens, and only after the owner approves the mockup builds the template code. Use when the user asks to create, add, or make a new template/mẫu thiệp (with or without a design image), or to redo an existing template's design.
---

# new-template (v2: design first)

The previous version (build straight from a design image) is archived in `docs/archive/new-template-skill-v1.md`.
Read `docs/design-guide.md` before step 1: it holds the design groups, the 5 layers, colour and type rules, and the 10-point check.

Talk to the owner in Vietnamese. Never deploy. Commit only after the owner approves the finished template.

## Preconditions

1. `my-wed/src/core/` and `my-wed/src/templates/index.ts` exist (shared data contract and registry).
2. Pick the next free id from `templates/index.ts`.
3. The dev server can run (`cd my-wed && npx zmp start -nF -P 3100`) for steps 4–5.

## Step 0: the owner chooses (one question round)

If the owner already named a group/story (e.g. "mẫu sen hồng truyền thống") or gave a design image, derive the choices and skip the questions it answers. Otherwise ask with AskUserQuestion, one round, up to 4 questions:

1. **Nhóm thiết kế**: A. Truyền thống nền sáng / B. Tranh phong cảnh / C. Hoa lá tràn mép / D. Nền tối ánh kim (E. Mảng màu via "Other").
2. **Câu chuyện**: 3 suggestions from the chosen group in the design guide (pick ones not used by an existing template; check `templates/index.ts` names).
3. **Màu chủ đạo**: 3 muted options fitting the story (name + hex).
4. **Mở đầu**: cửa mở / phong bì / rèm / không có, or a new idea that fits the story. Prefer one no other template uses.

Questions 2–3 depend on 1; if the group is not known yet, ask question 1 alone first.

## Step 1: design brief (short, in the reply)

About 10 lines, all decided, no options:
- Story in one sentence; group.
- Palette with hex and shares (background %, main %, accent %), per the guide's colour rules.
- Fonts: names, titles, small caps label (installed `@fontsource` families; adding one is allowed, say so).
- Layer 1, first screen: layout described in one or two lines.
- Layer 2, section frame style. Layer 3, background. Layer 4, the art at divider, gift, footer. Layer 5, album style.
- Intro: how it opens.
- Art list: each piece and its source (code / public-domain / AI), per guide section 6.

## Step 2: mockup image, then STOP for review

1. Copy `my-wed/scripts/design/mockup-starter.html` to `my-wed/design/tNN/mockup.html` and draw the 8 screens in plain HTML/CSS: intro closed, first screen, families and names, date and venue, album, calendar/countdown/programme, RSVP and gift, thanks. Use the demo photos in `src/static/`, the brief's tokens and fonts, real Vietnamese text from the demo data.
2. Art: make the code-drawn pieces now (SVG inline or files in `design/tNN/art/`). Public-domain pictures: download into `design/tNN/art/`, note the source. Missing art: a `.todo-art` box with a label, never a random image.
3. Render: `cd my-wed && node scripts/design/mockup.mjs design/tNN/mockup.html <scratchpad>/tNN-mockup.jpg`. Look at it yourself, fix obvious problems once.
4. Measure: `python3 scripts/design/palette.py <scratchpad>/tNN-mockup.jpg`; fix colours that miss the targets.
5. Send the image to the owner (SendUserFile) with the brief and a 10-point score (guide section 8), short.
6. **Stop and wait.** Do not write template code until the owner approves the mockup. Apply their comments to the mockup and re-send as many rounds as they want.

## Step 3: build (after approval only)

- Files: `templates/tNN/index.tsx`, `styles.scss`, `demo-data.ts`; art in `src/static/tNN/` (compressed: JPEG/WebP, keep each under ~200 KB); thumbnail `src/static/thumbs/tNN.jpg` (360x640, from the first screen).
- Copy the mockup's tokens into `styles.scss` unchanged. Reuse `_kit` (Reveal, CalendarCard, Countdown, RsvpForm, GiftCard, VenueActions, GuestName, LunarNote, photoSrc).
- All shared features from the guide's section 7 are present, in that order. Never edit `src/core/`; if the design needs a core change, ask.
- Register in `templates/index.ts` at the end of the list.
- `npx -y -p typescript@5.6.3 tsc --noEmit -p .` must pass.

## Step 4: check against the mockup

1. `node scripts/design/shots.mjs tNN <scratchpad>/tNN` gives a strip in the same layout as the mockup. Compare the two; fix differences, at most 2 rounds (layout, then type, then colour, then decoration).
2. `python3 scripts/design/palette.py <scratchpad>/tNN/tNN-strip.jpg` and the 10-point check again.

## Step 5: video and hand-off

1. `node scripts/design/video.mjs tNN <scratchpad>/tNN.mp4 28` (9:16, 1080x1920).
2. Send the video and the strip. Report in a few lines: what was built, the score, anything left (art still missing, guesses).
3. When the owner approves: commit on `main`, push, then sync `claude/commit-folder-to-repo-lnvcke` (see CLAUDE.md). Do not commit the mockup image; `design/tNN/mockup.html` and its code-drawn art may be committed.
