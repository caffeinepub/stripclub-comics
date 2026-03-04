# StripClub Comics

## Current State
Single-page React app with a comic book dark theme. Shows two Google Slides-embedded comics ("Legends of the Hidden Butt" and "Peehead and Butthead") with a PG-13 banner. Has a logo at the top, halftone background, and bold comic-book typography (Bangers + Bricolage Grotesque).

## Requested Changes (Diff)

### Add
- A new page/route called "Everyday Comics (EDC)" accessible ONLY from its own dedicated route (`/edc`)
- EDC page shows AI-generated comic strips with adult humor (cussing, butt jokes, lowbrow gags)
- The EDC comics are NOT shown on the main home page — exclusive to the EDC page
- EDC page has its own mature content warning banner (18+ or explicit humor notice)
- Navigation: add an "EDC" link/button somewhere on the main page that leads to `/edc`
- Back link on the EDC page to return home
- EDC comics displayed as comic-panel style cards with generated strip artwork and captions

### Modify
- App needs client-side routing (react-router-dom or hash routing) to support `/` (home) and `/edc` routes
- Main home page gets a teaser/link section pointing to EDC page

### Remove
- Nothing removed from home page

## Implementation Plan
1. Add react-router-dom for routing (or use hash-based routing if already available)
2. Create `src/pages/Home.tsx` — extract existing App content
3. Create `src/pages/EDCPage.tsx` — EDC page with:
   - Its own mature-content banner ("Explicit humor, strong language, butt jokes. You've been warned.")
   - 4-6 AI-generated comic strip panels (static generated images + captions)
   - Comic titles with crude/funny names
   - Back-to-home nav
4. Update `App.tsx` to be a router shell with routes for `/` and `/edc`
5. Generate comic strip images for EDC page (illustrated style, adult humor)
6. Add EDC teaser section at bottom of home page with link
