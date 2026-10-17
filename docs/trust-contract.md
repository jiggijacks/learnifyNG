# LearnifyNG Trust Contract

**Status:** Proposed product rules for the first production investigation pipeline. This document records required behavior; it does not mean those capabilities are already implemented.

## 1. Core rule

Learnify must distinguish a claim, a source, an evidence item, a community report, a verification decision, a confidence assessment and an advisory. They are related, but they are not interchangeable.

## 2. Provenance required for evidence

Where available, every evidence item should record:
- the exact claim it bears on;
- source title, publisher or author, canonical URL or durable reference;
- a relevant source excerpt or document location;
- publication date, observation date and retrieval time as separate values;
- geographic scope (country, city, district, area or landmark);
- source type and origin (official, primary document, first-hand report, public record, news, review or other);
- the person or process that submitted or collected it;
- its review state and a record of review decisions;
- the investigation and option it supports or challenges.

Unknown fields must be stored as unknown, not guessed. A source URL alone does not prove a claim.

## 3. Separate report, evidence and verification

- **Community report:** A person's account. It remains a report until reviewed.
- **Evidence candidate:** A reviewed report that may be relevant to an investigation. It is not automatically evidence that proves the claim.
- **Evidence item:** A traceable source passage, record, observation or report linked to a specific claim and location.
- **Community corroboration:** Independent residents or experiences support a report. Repeated, copied or coordinated submissions must not be treated as independent.
- **Verified:** A moderator-approved state backed by documented source and scope checks. AI classification alone can never grant this state.
- **Conflicting:** Credible material points in materially different directions. Do not average away or hide the disagreement.
- **Needs investigation:** Important details, provenance, locality, freshness or independent support are missing.
- **Rejected:** A moderator has rejected the item, with a recorded reason.

A source may reliably establish only a narrow claim. Verification must not generalize beyond its actual scope.

## 4. Minimum checks before verification

A moderator workflow should record:
1. **Relevance:** Does the source support or challenge the exact claim?
2. **Source quality:** Is the origin attributable and appropriate for this kind of claim?
3. **Locality:** Does the evidence apply to the named location and appropriate geographic scale?
4. **Freshness:** Are publication and observation dates known and suitable for a claim that may change?
5. **Independence:** Does the support come from independent sources rather than duplicates or copied reports?
6. **Conflict:** Is there credible contradictory evidence or an unresolved limitation?
7. **Decision record:** Who reviewed it, when, and why?

A first-hand report can support the limited claim that a person had a particular experience. It must not automatically establish a broad claim about every resident, provider or time period.

## 5. AI responsibilities and boundaries

AI may:
- classify a question and propose a research plan;
- search for source candidates using an approved search tool;
- extract claims with their source URLs and supporting excerpts;
- identify dates, locations, likely duplicates and possible conflicts;
- summarize the evidence and clearly list missing information;
- draft advisory text based only on eligible evidence and stated user priorities.

AI must not:
- invent a source, quote, date, location, field test, resident report or verification action;
- turn a model-generated statement into evidence;
- mark anything verified;
- suppress credible conflicts;
- count duplicated/copied reports as independent support;
- produce a numerical confidence score without an implemented, documented calculation over eligible evidence.

When a source cannot be accessed or a detail cannot be confirmed, the result must say so.

## 6. Confidence and advisory

Confidence is a product calculation, not a model's feeling. Before displaying a real score, Learnify must define and test a deterministic calculation that considers evidence quality, locality, freshness, source independence, verification coverage and material conflicts. The score must be explainable from its inputs.

No eligible evidence means **insufficient evidence**, not a fabricated score. Seeded or illustrative data must not be presented as live verified input. Advisory must distinguish observed facts from assumptions and user-priority tradeoffs.

## 7. User-facing labels

Use plain language:
- Pending review
- Being checked
- Community corroborated
- Verified
- Reports conflict
- Needs more checking
- Not accepted

The interface should state that community corroboration is not independent Learnify verification. Any prototype using sample values must label them clearly as illustrative.

## 8. Change control

Any change to verification eligibility, source independence, freshness thresholds or confidence logic should update this contract and its tests before it is used for production decisions.
