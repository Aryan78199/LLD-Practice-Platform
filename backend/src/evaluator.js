const checks = [
  {
    key: "interface",
    label: "Abstraction/interface",
    patterns: [/interface\b/i, /abstract\b/i],
    points: 2,
    strength: "Uses an abstraction or interface.",
    issue: "No clear interface/abstraction was detected.",
    suggestion: "Introduce interfaces where behaviour may have multiple implementations."
  },
  {
    key: "class",
    label: "Multiple classes",
    patterns: [/class\s+\w+/gi],
    points: 2,
    strength: "Shows multiple domain classes.",
    issue: "Few explicit domain classes were detected.",
    suggestion: "Break the design into focused domain objects with clear responsibilities."
  },
  {
    key: "responsibility",
    label: "Responsibility separation",
    patterns: [/responsibilit/i, /separation of concerns/i, /single responsibility/i],
    points: 2,
    strength: "Addresses responsibility separation.",
    issue: "Responsibility boundaries are not clearly explained.",
    suggestion: "State what each important class owns and avoid one manager doing everything."
  },
  {
    key: "strategy",
    label: "Strategy/extensible behaviour",
    patterns: [/strategy pattern/i, /strategy\b/i],
    points: 2,
    strength: "Uses or discusses a strategy for replaceable behaviour.",
    issue: "No replaceable strategy was detected.",
    suggestion: "Consider a strategy interface for behaviour likely to change."
  },
  {
    key: "state",
    label: "State modelling",
    patterns: [/state pattern/i, /\bstate\b/i],
    points: 2,
    strength: "Considers explicit state/transition behaviour.",
    issue: "State transitions are not clearly described.",
    suggestion: "For state-heavy systems, model valid states and transitions explicitly."
  }
];

export function evaluateSolution(solution, problem) {
  const strengths = [];
  const issues = [];
  const suggestions = [];
  let matchedSignals = 0;

  const relevantChecks = checks.filter((check) =>
    problem.expectedSignals.includes(check.key)
  );

  for (const check of relevantChecks) {
    const matched = check.patterns.some((pattern) => {
      pattern.lastIndex = 0;
      return pattern.test(solution);
    });

    if (matched) {
      matchedSignals += 1;
      strengths.push(check.strength);
    } else {
      issues.push(check.issue);
      suggestions.push(check.suggestion);
    }
  }

  const score = relevantChecks.length
    ? Math.round((matchedSignals / relevantChecks.length) * 10)
    : 0;

  if (score >= 8) {
    strengths.push("The design covers most of the MVP evaluation signals.");
  }

  if (score <= 4) {
    issues.push("The design needs more explicit domain structure.");
  }

  return {
    score,
    strengths,
    issues,
    suggestions
  };
}
