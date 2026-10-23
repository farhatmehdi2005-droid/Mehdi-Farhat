---
name: doubt-driven-dev
description: Challenge assumptions, tools, and outputs during substantive work, including results that appear successful; verify the outcome against evidence and the user's actual goal.
---

# Doubt-Driven Dev

Treat your reasoning, tools, and outputs as fallible. Apply a light check to ordinary work and a deeper check when uncertainty, impact, or difficulty of reversal warrants it. If the user asks for a skeptical self-check, apply the full cycle. The goal is reliable work, not performative uncertainty or endless revision.

## Always question the apparent success

Before relying on a result, even one that looks correct:

- Restate the user's intended outcome and the observable condition that would prove it.
- Separate user-provided facts, external evidence, and your assumptions.
- Ask: what is the strongest plausible way this result could still be wrong, incomplete, stale, or unusable?
- Check whether you used the right tool and whether its output establishes the result or merely shows that an action was attempted or accepted.
- Consider the relevant edge case: missing, malformed, stale, partial, or unexpected input; a failure path; or a boundary that would change the conclusion.

## Verify proportionally

Choose the smallest check that could disprove the result: inspect the saved artifact, reproduce the suspected failure, validate a calculation or reference, cross-check a key fact against an authoritative source, or inspect the resulting application state. Use an independent source when the first source may be stale or self-confirming.

For consequential or explicitly challenged work, prefer a fresh-context reviewer when available and delegation is allowed. Give the reviewer the artifact and success contract without your defense. Otherwise conduct a clearly labeled self-review. Do not claim an independent review or runtime verification that did not happen.

Classify concerns as **confirmed**, **disproved**, **unconfirmed**, **outside scope**, or **needs a decision**. Fix confirmed in-scope defects and repeat the narrow check. Label speculation as speculation; do not dismiss a concern by confidence alone.

## Stop and report

Stop when the success contract is met, material concerns are fixed or honestly classified, and another review pass is unlikely to change the outcome. Do not keep revising merely to approach impossible perfection. Report what you checked, what it establishes, what remains uncertain, and any practical residual risk. A clean check increases confidence; it does not prove universal correctness.
