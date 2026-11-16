# Design system — "Gel under UV"

A dark-room portfolio for a bioinformatics and AI student. The ground is the indigo-black of a gel
box, interactive things glow soft lavender, and atmosphere comes from UV violet with a cool sky glint. One loud moment (the
name being read out of a nucleotide sequence beside a rotating DNA helix); everything else stays quiet.

Tokens live in `src/app/globals.css`. Use the variables, never inline hex.

## Colour

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0818` | Page ground |
| `--bg-deep` | `#06050f` | Alternate band (tech stack, footer), code blocks |
| `--surface` / `--surface-raised` | `#131029` / `#1a1636` | Cards, inputs, hover fill |
| `--ink` | `#ece9f5` | Text and headings |
| `--muted` / `--faint` | `#a39fbd` / `#8d88ab` | Secondary text / dates, placeholders (both pass 4.5:1 on `--surface`) |
| `--accent` | `#b4a6ff` | Anything you can act on: primary button, active filter, links, focus ring |
| `--accent-ink` | `#140f2e` | Text on an `--accent` fill |
| `--violet` | `#7f6dff` | Atmosphere only: hero glow, helix, background threads, aurora |
| `--glint` | `#8fd0ff` | Where light catches an edge: the end of text gradients, helix highlights, the nav hairline |
| `--hairline` / `--hairline-strong` | ink at 10% / 20% | 1px separators and outlines |

- `--accent` means "interactive". Do not use it for decoration.
- Glow and gradients are reserved for the hero wash and the reading-progress bar.
- `--helix-a/b/c` must stay hex: the WebGL helix parses them.

## Type

| Role | Face | Notes |
|---|---|---|
| Display | Bricolage Grotesque (variable, optical-size axis on) | Headings and the wordmark. Weight 600–700, tracking −0.02 to −0.045em |
| Body | Pretendard Variable | 17px / 1.6. Article body 17px / 1.85, `word-break: keep-all` for Korean |
| Code | system monospace | Code only |

- Sentence case. No all-caps labels, no eyebrow above every heading, no numbered markers on
  things that are not a sequence.
- Hero name `clamp(44px, 11.2vw, 168px)`; page titles `clamp(48px, 9.5vw, 136px)`; section titles
  `clamp(34px, 4.6vw, 60px)`.

## Surfaces

- Backgrounds are flat `--bg` everywhere. The film-grain overlay appears on the home page only;
  blog, portfolio, post and experience pages stay grain-free so body text reads cleanly.

## Layout

- Container 1240px, 40px gutters (20px under 640px). Content is left-aligned.
- Fixed floating header: a single glass bar with a gradient hairline holding the wordmark, text links
  (About me, Experience, Portfolio, Blog) and search. The current page is marked by a glowing accent dot,
  hover by a faint pill. The links collapse to a menu button when they no longer fit. Pages add `--header-height` of top padding.
- Experience content lives in `src/data/experience.ts`.
- Radii: 20px cards, 10px inside articles, full pill for buttons, chips and inputs.

## Motion

Engine: GSAP (ScrollTrigger, SplitText, ScrambleText, Flip) registered once in `src/lib/gsap.ts`;
Lenis for smooth scrolling; React `<ViewTransition>` for route changes. Effects come from React Bits
components in `src/components/reactbits/` (vendored as published, excluded from lint).

| Where | What | Why |
|---|---|---|
| Home hero, on load | Name decodes from `ATGC`, supporting lines settle after it | The one orchestrated moment |
| Hero backdrop | A field of drifting `ATGC` letters around the helix, under violet light rays from the top right | The sequence the name is read from |
| Hero copy | One band of light crosses the name after it resolves; the line below keeps decoding the next research interest | Says what the work is about |
| Helix | Rotates slowly; scrolling and dragging turn it; swells as the hero scrolls away | The subject, made touchable |
| Marquee | Tools run past and speed up with scroll | Scroll-driven |
| Research interests | The section pins; scrolling drives one line of display type sideways, each term lighting as it crosses the middle | The one pinned scene |
| Statement | Words light up as they scroll through, over a slow two-colour aurora | Scroll-driven, so the reader sets the pace |
| Tech cards | One staggered entrance; the card edge glows toward the pointer | Responds to the reader |
| Experience | The timeline rail fills as it scrolls through | Shows progress through time |
| Blog filter | Cards glide to their new slots (Flip) when a tag is picked | Shows what changed |
| Route change | 140ms fade out, 240ms fade + 14px rise in | Continuity |
| Article | Reading-progress bar only | The text is the point |

Rules:

- Animate `transform` and `opacity` only. Easing: `--ease-out` for entrances, `--ease-in-out` for
  on-screen movement, linear for the marquee and progress bar.
- UI feedback stays under 300ms; press state is `scale(0.97)`. Hover motion is gated behind
  `(hover: hover) and (pointer: fine)`.
- Typing in the search box filters instantly. Never animate keyboard-driven changes.
- Create every tween and ScrollTrigger inside `useGSAP` so it is cleaned up on route change.
- WebGL is limited to the home hero (helix, light rays at device-pixel-ratio 1), the statement aurora and the
  listing-page threads. Each pauses when it is off screen.
- One pinned scene per page.
- `prefers-reduced-motion`: no Lenis, no entrances, helix paused, marquee static. All content
  must be visible without any animation having run.

## Don't

- Add a second accent colour, or shadows on cards.
- Add an intro loader or a custom cursor.
- Put effects inside article bodies.
- Add an entrance animation to every section; if a new one is needed, remove one first.
