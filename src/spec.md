# Specification

## Summary
**Goal:** Build the offline-first “DRAFT MASTER” app shell and core drafting practice experience, including Legal Notice as the end-to-end reference track, with tutorials, wizard-based drafting, free practice, automated feedback, portfolio, skills, gamification, sharing, and export/print features.

**Planned changes:**
- Create the core app shell with persistent navigation and routes: Draft, Learn, Portfolio, Skills, Settings (English-only UI text).
- Apply the “Professional Legal Office” theme (colors + Merriweather/Source Sans Pro/Georgia typography) with mobile-responsive layouts.
- Implement 8 draft-type tracks grouped into Phase 1 and Phase 2 with NOT STARTED / IN PROGRESS / MASTERED statuses and a progress summary.
- Implement the per-draft-type 4-step workflow: Learn Structure, Guided Drafting Wizard, Free Practice, Compare & Improve with refine-and-resubmit loop.
- Build Legal Notice end-to-end: interactive structure tutorial + annotated model, wizard with provided questions, free-practice scenario, and compare view surfacing example issue types.
- Add an offline-first persistence layer (browser storage) for XP/levels, achievements, per-type progress, skill scores, and portfolio items/attempts.
- Implement the drafting editor for wizard and practice drafts with autosave (30s), manual Save confirmation, and Submit for Review creating an attempt record.
- Implement a local automated feedback/scoring engine (no external AI) producing issues, suggestions, positives, overall score (0–10), and 5 sub-scores; persist results.
- Create the side-by-side comparison UI with issue highlighting, model hidden until submission, and actions: Refine Draft, Save, Try New.
- Build a scenarios bank for all 8 draft types (≥5 per type) with Basic/Intermediate/Advanced difficulties and associated model drafts for comparison.
- Add per-draft-type learning resources: Common Mistakes (top 10 with why/fix/example) and a checklist, accessible from drafting screens.
- Implement Portfolio: grouped by type with score/date, totals/average, open/edit/re-review, export per draft (PDF/plain text) and Export All to a single PDF.
- Implement Skills dashboard: 5 progress bars, overall proficiency from recent submissions, and a simple per-submission score history.
- Add gamification: XP rules, levels 1–15 with titles, achievements with specified names/triggers; persist and display in UI.
- Implement mastery logic: MASTERED when score ≥8 on 3 separate drafts of the same type; reflect across selection and summaries; generate mastery event records.
- Add Weekly Challenge: show current challenge, Accept flow, dedicated drafting/submission, award 200 XP and badge/progress, persist completion.
- Add special modes: voice-to-text via browser speech recognition (with fallback) and timed drafting mode (default 30 minutes) for practice and challenges.
- Implement collaborative review via share link with unguessable token, comments persisted, and owner revocation.
- Add optional canister-backed endpoints for shared links/comments and optional backup/sync while keeping full offline functionality and no required sign-in (Internet Identity optional).
- Implement Settings: reset local data (confirmed), export/import local JSON backup, toggles for voice-to-text and online backup/sharing, configurable endpoint for posting mastery events (no hardcoded URL).
- Provide in-app templates (blank formats) per draft type with downloads (plain text/PDF), kept separate from scenarios/model drafts.
- Create a Clause Library with starter clauses (Termination, Jurisdiction, Force Majeure), filter by draft type/purpose, copy-to-clipboard, and insert-into-editor.
- Add a static Before/After Gallery with highlighted improvements, accessible from Learn.
- Implement print-ready formatting with Print Preview and ensure PDF exports match formatting.
- Generate and include static visual assets (logo, badges/icons, favicon) under `frontend/public/assets/generated` and render them in the UI.

**User-visible outcome:** Users can choose a draft type, learn structure, draft via wizard or free practice, submit for local automated feedback, compare against a model draft, refine and resubmit; track progress/skills/XP/achievements/mastery offline; manage a portfolio with export/print; attempt weekly challenges with timed/voice modes; share drafts via link for comments; and configure backups/sync and data controls in Settings.
