import test from "node:test";
import assert from "node:assert/strict";
import { evaluateSolution } from "../src/evaluator.js";
import { problems } from "../src/problems.js";

test("scores a structured Parking Lot solution", () => {
  const solution = `
    interface SpotAllocationStrategy {}
    class Vehicle {}
    class ParkingSpot {}
    class ParkingLot {}
    Strategy Pattern separates allocation.
    Each class has a single responsibility.
  `;

  const result = evaluateSolution(solution, problems[0]);

  assert.equal(result.score, 10);
  assert.ok(result.strengths.length >= 4);
});

test("returns issues for a weak solution", () => {
  const result = evaluateSolution("I would make a parking app.", problems[0]);

  assert.equal(result.score, 0);
  assert.ok(result.issues.length > 0);
  assert.ok(result.suggestions.length > 0);
});

test("keeps evaluation consistent across repeated attempts", () => {
  const solution = `
    interface SpotAllocationStrategy {}
    class Vehicle {}
    class ParkingSpot {}
    class ParkingLot {}
    Strategy Pattern separates allocation.
    Each class has a single responsibility.
  `;

  const first = evaluateSolution(solution, problems[0]);
  const second = evaluateSolution(solution, problems[0]);

  assert.equal(first.score, 10);
  assert.equal(second.score, 10);
});
