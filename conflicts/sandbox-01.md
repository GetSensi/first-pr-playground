# Task #4 — Merge Conflict Sandbox 01

This file intentionally contains a Git **merge-conflict block**. It is here so you can practise resolving a conflict cleanly, in a safe sandbox.

A conflict looks like three layers: a `HEAD` section (your changes), a separator line, and an `main` section (the incoming changes) — surrounded by marker lines that begin with characters like `<`, `=` and `>`.

To complete Task #4: **keep BOTH lines below** (they both describe Sensi correctly) and delete every marker line so only clean prose remains.

```
<<<<<<< HEAD
Sensi helps student developers earn verification points for real open-source work.
=======
Sensi turns every merged pull request into verifiable proof of work.
>>>>>>> main
```

TODO(task-4): Resolve the block above so both sentences survive, then remove all three marker lines. Nothing else in this file should change.
