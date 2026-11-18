# Sensi First PR Playground — Ship Your First Real Pull Request in 15 Minutes

Welcome, builder. This repository exists so that any student developer can make a **real, merged Pull Request** in under 15 minutes and earn **starter verification points** on [Sensi](https://getsensiin.vercel.app).

No frameworks. No installs. No setup hell — just Node.js, Markdown and JSON.

Every task below is intentionally small and intentionally "broken" in a friendly, well-documented way. Pick one, fix it, open a PR, and our GitHub Action will give you an instant green checkmark.

---

## How it works — the 4-step workflow

```
Fork  →  Pick a Starter Task  →  Branch & Commit  →  Open PR & Link on Sensi
```

1. **Fork** this repository to your own GitHub account.
2. **Pick a Starter Task** from the table below (each one is `Starter · <30m`).
3. **Branch & Commit** your fix on a branch named `fix/<your-handle>-task`.
4. **Open PR & Link on Sensi** so your merged work is verified and scored.

New to Git? Follow the copy-paste commands in [CONTRIBUTING.md](CONTRIBUTING.md).

---

## The 7 Starter Tasks

Every task ships with an inline `TODO(task-N)` marker so you always know exactly what to change.

| Task | Difficulty | Target file(s) | Verification rule |
| --- | --- | --- | --- |
| **Task #1** — Builder Directory JSON | `Starter · <30m` | `builders/<your-handle>.json` | File is valid JSON, all required fields are non-empty, and the filename matches the `handle` value. |
| **Task #2** — Markdown Table Alignment | `Starter · <30m` | `DIRECTORY.md` | Both placeholder rows are cleanly aligned, no `TODO(task-2)` remains, and you have added yourself as a row. |
| **Task #3** — String Slugify Utility | `Starter · <30m` | `src/slugify.js` | `slugify("@Official Synor ")` returns `official-synor` (leading `@` removed, whitespace trimmed). |
| **Task #4** — Merge Conflict Sandbox | `Starter · <30m` | `conflicts/sandbox-01.md`, `conflicts/sandbox-02.md` | Both conflicting lines are kept and every conflict marker is removed. |
| **Task #5** — Off-by-One Pagination | `Starter · <30m` | `src/paginate.js` | `paginate(items, 1, perPage)` returns the **first** page (page numbers start at 1). |
| **Task #6** — CLI Help Flag | `Starter · <30m` | `bin/sensi-check.js` | `node bin/sensi-check.js --help` prints usage and exits `0` instead of erroring. |
| **Task #7** — Hindi Localization Strings | `Starter · <30m` | `locales/en.json`, `locales/hi.json` | `locales/hi.json` has all 6 onboarding keys with non-empty Hindi translations. |

> Rule of thumb: **1 task = 1 pull request.** Keep your diff focused so it merges fast.

---

## Automated checks

Every pull request runs [`scripts/validate.js`](scripts/validate.js) via GitHub Actions:

- Every `builders/*.json` file must be valid JSON.
- Required non-empty fields: `handle`, `name`, `primary_stack`, `github_url`, `building_now`.
- The filename must match the `handle` value (`officialsynor.json` → handle `officialsynor`).
- No leftover merge-conflict markers may remain in resolved files.

Run it locally before you push:

```bash
node scripts/validate.js
```

---

## Get points on Sensi

- Browse all live tasks: **https://getsensiin.vercel.app/tasks**
- See where you rank: **https://getsensiin.vercel.app/leaderboard**

When your PR is merged, head to the Tasks page, paste your PR link, and your starter verification points will be recorded.
