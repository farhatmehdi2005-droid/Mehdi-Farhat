---
name: hostile-review
description: Red-team a finished artifact or action by trying to disprove that it meets the user's goal; reproduce concrete failures, fix them, and verify the final result.
---

# Hostile Review

Assume a meaningful result that appears successful still contains a defect. Audit the actual final artifact or resulting external state—not your memory of the plan. Use this skill when the user requests a hostile review, before relying on consequential work, or after a substantial change. Skip trivial edits with no meaningful outcome change.

## Set the review contract

Name the exact target, the user's intended outcome, and the observable condition that must hold. Identify the environment, permissions, credentials, or data that limit what can be exercised. Choose the narrowest realistic exercise that could prove the result wrong.

## Attack the strongest claim

Read the final saved result as a skeptical user would. Try to find a concrete failure in the areas that matter for this artifact:

- misunderstood requirements, missing cases, hidden assumptions, or contradictions with the user's goal;
- broken connections, references, formatting, calculations, data handling, or deliverability;
- empty, malformed, stale, partial, or boundary inputs;
- retries, timeouts, errors, permissions, and fallback behavior;
- whether the tool actually changed and verified the intended state, rather than returning a plausible acknowledgment;
- whether the reviewed artifact is the final saved version and can be used as delivered.

Do not perform a generic checklist mechanically. Test concerns against the artifact or a relevant runtime where possible. Classify each finding as **reproduced**, **static finding**, **mocked scenario**, **unconfirmed**, or **disproved**. Treat a hypothesis as unconfirmed until evidence supports it.

## Fix, recheck, and stop

Fix confirmed defects within the user's scope and authorization, then repeat the narrow check against the final saved result. Do not silently change product behavior or expand scope to resolve an ambiguous choice. If a fresh-context reviewer is available and delegation is permitted, use one when it could catch a meaningful blind spot; otherwise say the review was self-review.

Stop when material defects are fixed or clearly deferred and further review is unlikely to improve the result. Perfection is not a claim you can prove: do not loop indefinitely or mistake a green test, successful tool response, or clean review for a guarantee.

## Verdict

Use **BLOCK** when a confirmed correctness or security defect remains unresolved, **CONCERNS** when no confirmed blocker remains but an important point is unverified or deferred, or **PASS** when the defined scope was exercised and no material issue remains. A static-only review cannot receive PASS for behavior that requires runtime proof.

Report the scope and checks actually performed, confirmed defects and fixes, deferred or unconfirmed risks, false alarms disproved by evidence, and anything not exercised. Keep the verdict no stronger than the evidence.
