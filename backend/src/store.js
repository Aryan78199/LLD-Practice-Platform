import { randomUUID } from "node:crypto";

const attempts = [];

export function createAttempt({ problemId, solution, evaluation }) {
  const attempt = {
    id: randomUUID(),
    problemId,
    solution,
    evaluation,
    createdAt: new Date().toISOString()
  };

  attempts.unshift(attempt);
  return attempt;
}

export function listAttempts() {
  return attempts;
}

export function getAttempt(id) {
  return attempts.find((attempt) => attempt.id === id);
}

export function clearAttempts() {
  attempts.length = 0;
}
