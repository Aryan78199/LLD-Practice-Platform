# AI_USAGE.md

## 1. Evaluation design

AI suggested making an LLM responsible for the complete score. I rejected that approach for the core score because important structural checks should be deterministic and reproducible.

## 2. Feedback explanation

I accepted the idea of using AI for natural-language explanations. The prototype keeps the scoring rules deterministic and leaves richer explanation as a future extension.

## 3. Parking Lot domain design

AI suggested separating parking allocation behind a `SpotAllocationStrategy` interface. I accepted this because different allocation policies can be added without changing the main parking service.

## 4. Vending Machine design

AI suggested modelling the machine around explicit states. I accepted this because state transitions such as idle → item selected → payment received → dispensing are easier to reason about when represented explicitly.

## 5. Prototype scope

AI suggested authentication, persistent databases and a production queue. I rejected these for the 2-day MVP because they would consume time without improving the core practice → submission → feedback loop.

## What I retained from AI

- Strategy pattern for extensible parking allocation.
- State-oriented thinking for vending machine.
- Deterministic evaluation for repeatable results.
- Simple history model for retry and improvement.

## What I rejected

- Full LLM-based scoring.
- Microservices.
- Kubernetes/deployment complexity.
- Authentication and payments for the MVP.
