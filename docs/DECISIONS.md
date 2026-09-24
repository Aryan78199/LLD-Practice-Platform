# DECISIONS.md

## Decision 1: Deterministic evaluation first

The evaluator checks observable signals in the submitted design, such as interfaces, multiple classes, separation of responsibilities and relevant design patterns.

Why: two identical submissions should receive the same baseline evaluation.

## Decision 2: Strategy interface for parking allocation

`SpotAllocationStrategy` isolates the choice of parking spot from the rest of the parking domain.

Why: the allocation policy can change without modifying the core manager.

## Decision 3: In-memory storage

The backend stores attempts in memory.

Why: this is a 2-day prototype. The product requirement is the learner loop, not database operations.

## Decision 4: AI is not the source of truth for scores

An LLM can explain detected issues in a future version, but deterministic rules remain the source of truth for baseline scoring.

## Decision 5: One backend service

A single Express service is used instead of microservices.

Why: the assignment explicitly asks for a focused prototype and does not require distributed-system infrastructure.
