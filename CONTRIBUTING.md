# Contributing to the Sensi First PR Playground

Thanks for making your first real contribution. This guide assumes **zero** prior Git experience — just copy, paste, and edit what you need.

You only need two things installed: [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org) (v18 or newer).

---

## Step-by-step Git commands

Replace `YOUR-HANDLE` with your GitHub username (for example `officialsynor`) and `task-N` with the task number you chose.

### 1. Clone your fork

First fork this repository on GitHub (click **Fork**), then clone **your** fork:

```bash
git clone https://github.com/YOUR-HANDLE/first-pr-playground.git
cd first-pr-playground
```

### 2. Create a branch

```bash
git checkout -b fix/YOUR-HANDLE-task-N
```

### 3. Make your change

Open the target file for your task, search for the `TODO(task-N)` marker, and fix it.

### 4. Stage your change

```bash
git add .
```

To stage a single file instead:

```bash
git add path/to/changed-file
```

### 5. Commit

```bash
git commit -m "fix(task-N): describe your change"
```

### 6. Push

```bash
git push origin fix/YOUR-HANDLE-task-N
```

### 7. Open the Pull Request

Go back to your fork on GitHub. A yellow banner will offer a **Compare & pull request** button — click it, describe your change, and submit.

---

## Pull Request checklist

Before you submit, confirm all of these:

- [ ] **1 task per PR** — I only fixed one starter task.
- [ ] **Passing CI check** — `node scripts/validate.js` passes locally (and the GitHub Action turns green).
- [ ] **No unrelated file edits** — I did not reformat or touch files outside my task.
- [ ] **No leftover `TODO(task-N)` markers** for the task I completed.
- [ ] **Branch name** follows `fix/<handle>-task`.

---

## Stuck?

Compare your branch against `main` any time:

```bash
git fetch origin
git diff origin/main
```

Once your PR is merged, claim your starter verification points at **https://getsensiin.vercel.app/tasks**.
