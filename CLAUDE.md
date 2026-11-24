# villieapp.com — Claude Context

The public marketing site for villie. Plain HTML and CSS, no build step.

> **Pushing to `main` publishes.** Vercel deploys every push to `main` to
> villieapp.com within about a minute. Work on a branch and open a PR.

The app lives in a separate repo (`Villie-LLC/villie-app`); its `CLAUDE.md`
carries the product, brand-token and release rules this file builds on.

## Pages

| Path | What it is |
|---|---|
| `index.html` | the landing page |
| `privacy.html`, `terms.html` | legal text — substance is counsel's, not ours to rewrite |
| `support.html`, `contact.html` | contact pages; `support` is the App Store Connect support URL |
| `auth/confirm/` | where **every new mother lands** after confirming her email — treat with the most care |
| `m/` | landing for shared Manual-video links (a Universal Links target) |
| `onboard/` | specialist-invite landing. Specialists are off; the page stays live for invitees but is unlinked |
| `.well-known/apple-app-site-association` | must be served as `application/json` (header in `vercel.json`) |

`index-genz.html` and `manual-tile-options.html` are gitignored explorations, not live.

## What the site may describe

The site must match the app's MVP, and copy must describe the thing under it.

- **The Manual** is the focal point: a briefing every week, weeks 1–52.
- Then, in this order (by how sharp the pain is): **milk stash, day sheet,
  sounds, picks, The Buzz**, and **milk sharing** as *coming soon*.
- **Never mention** Care / specialists, Gear, Milk Connect, Boxes or Plans —
  all switched off.
- **National launch from day one.** No "city by city", "Miami first" or
  "opens near you".

## Brand

- **Authority:** the studio's *Complete Brand Guidelines* (Softriver, Oct
  2026). Ask the founder for the PDF and logo sources; they aren't in the repo.
- **Typeface: Geist only** (Medium 500 headings, Regular 400 text), from Google
  Fonts. The app uses Outfit + Manrope — a known, deliberate divergence.
- **Palette:** white · champagne `#EEE3C0` · pastel heather `#B6C4CD` ·
  glaucous `#6083A3`, plus the guideline grays. Tokens live in `styles.css`.
- **Contrast rule:** glaucous cannot carry small text (3.1:1 on champagne,
  4.0:1 on white). Text-bearing dark fields use `--ink` `#33465A`
  (champagne on ink = 7.6:1).
- **Wordmark:** `villie-wordmark.svg`, trimmed to its ink bounds and painted as
  a CSS `mask` that inherits `currentColor`, so one file serves both lockups
  (glaucous on champagne, champagne on ink). The supplied artboard is
  1920×1080 with the logo at 11.9% of its height — **never re-export it
  padded**, or every masthead shrinks to a few pixels.
- **Emblem (the double-l loop):** used large and cropped by the edge of its
  band, in a solid palette colour. The guidelines forbid opacity changes,
  gradients, rotation and outlines on the mark.

## Design and copy: rejected on sight

- Pill / fully-rounded buttons (`border-radius: 999px`) and big soft corners.
  Corners on this site are square; the one curve is a phone's.
- Dot-prefixed eyebrows; small muted captions beside a CTA
- 3-up grids of rounded cards with rounded icon chips
- Numbered sections ("01 / 02 / 03") and margin-note label columns
- Generic copy ("Less Googling at 3am"), laundry-list heroes. **Less is more.**

Structure comes from hairlines, one shared left margin, flat full-bleed colour
fields and type scale.

## Content and trust — hard rules

- **No unreviewed clinical content on any public page — including inside
  screenshots.** Manual copy is still pending clinical review.
- **No placeholder or invented credentials on any public page, including
  inside screenshots.** A named "Dr. …, MD" on a marketing page is an
  endorsement claim, not a mock-up.
- No personal email addresses and no home address anywhere. The public contact
  is `help@villieapp.com` (Google Workspace). Confirm an alias exists before
  referencing a new one.

## How the site works

- **Waitlist** posts to Supabase REST (`/rest/v1/waitlist`) with the
  *publishable* key. RLS grants anon INSERT only — signups go in, nobody can
  read them back. A `409` means already on the list; treat it as success.
  `?src=` / `?utm_source=` tags attribution.
- **CSP lives in `vercel.json`.** A new external script, font or API host must
  be added there or it fails silently in the browser.
- **`styles.css`** carries the shared tokens for the secondary pages. The
  landing adds its own layout on top and opts out of the 760px reading column.
- **Legacy token bridge** at the bottom of `styles.css`: `onboard/` and
  `auth/confirm/` still use old token names (`--cinnamon` …). An undefined
  `var()` paints nothing — that once made the confirm page's button invisible.
  Delete the bridge only after rebuilding those two pages.
- **Scroll reveal is opt-in** behind a `js` class on `<html>`; never hide
  content unconditionally.
- **Share card:** `og-image.jpg`, 1200×630, kept under ~300KB (WhatsApp skips
  larger previews). Source and render recipe: `og-card.html`.

## Before you publish

1. Resolve every local `src`, `href` and `url()` across the live pages against
   disk. The share card once 404'd in production for months, and deleted brand
   assets have left broken icons.
2. Check 375px and 1280px: no horizontal overflow, no pill radii.
3. After pushing, verify on the live site with `curl` — pages 200, assets 200,
   AASA `content-type: application/json`.

Rendering gotchas: browsers cache `styles.css` (bust it with a query string),
and headless screenshots may not fire the scroll-reveal observer.
