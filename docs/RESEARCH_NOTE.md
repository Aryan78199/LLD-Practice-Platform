# Research Note — LLD Practice Platform

## 1. Problem

Low-Level Design practice is often easy to start but difficult to evaluate. A learner can write classes for systems such as Parking Lot, Elevator or Vending Machine, but without feedback it is hard to know whether responsibilities, interfaces, relationships and extensibility were handled well.

The core product opportunity is therefore not simply a library of LLD questions. It is a repeatable practice loop:

**Choose a problem → think/design → submit → receive feedback → review → try again.**

## 2. Target learner

The primary learner is a student or early-career developer preparing for software engineering interviews and trying to improve object-oriented and Low-Level Design skills.

The learner needs short practice sessions, clear requirements, actionable feedback and visible improvement across attempts.

## 3. Existing approaches

Common approaches include:
- Reading LLD articles and tutorials.
- Watching system-design/LLD videos.
- Solving interview questions in an editor.
- Comparing a solution with reference implementations.
- Discussing a design with a mentor or interviewer.

These approaches provide useful knowledge, but the feedback loop is often manual and inconsistent.

## 4. Product direction

The proposed platform focuses on practice rather than a large course or assessment system.

The MVP contains:
1. A small curated problem set.
2. A problem statement and requirements.
3. A submission editor.
4. A deterministic evaluation layer.
5. Structured feedback.
6. Attempt history and retry.

## 5. Why deterministic evaluation?

Some feedback can be expressed as repeatable checks. For example, the evaluator can detect whether a solution mentions interfaces, multiple classes, a relevant pattern, or separation of responsibilities.

This does not replace human judgement. It creates a stable baseline and leaves room for richer AI-assisted explanation later.

## 6. Success criteria for the MVP

A learner should be able to complete the entire loop without manual intervention:

**select problem → write solution → submit → see feedback → view previous attempt → retry.**

The prototype is intentionally small so the engineering effort remains focused on LLD/domain design and the feedback experience.
