import express from "express";
import cors from "cors";
import { problems } from "./problems.js";
import { evaluateSolution } from "./evaluator.js";
import { createAttempt, getAttempt, listAttempts } from "./store.js";

const PORT = Number(process.env.PORT) || 4000;
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(express.json({ limit: "100kb" }));
app.use((req, _res, next) => {
  if (req.method !== "GET" && req.headers["content-type"]?.includes("application/json")) {
    next();
    return;
  }
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/problems", (_req, res) => {
  res.json(problems);
});

app.get("/api/problems/:id", (req, res) => {
  const problem = problems.find((item) => item.id === req.params.id);

  if (!problem) {
    return res.status(404).json({ error: "Problem not found" });
  }

  res.json(problem);
});

app.post("/api/submissions", (req, res) => {
  const { problemId, solution } = req.body ?? {};

  if (!problemId || !solution || solution.trim().length < 30) {
    return res.status(400).json({
      error: "A solution of at least 30 characters is required."
    });
  }

  const problem = problems.find((item) => item.id === problemId);

  if (!problem) {
    return res.status(404).json({ error: "Problem not found" });
  }

  const evaluation = evaluateSolution(solution, problem);

  const attempt = createAttempt({
    problemId,
    solution: solution.trim(),
    evaluation
  });

  res.status(201).json(attempt);
});

app.get("/api/attempts", (_req, res) => {
  res.json(listAttempts());
});

app.get("/api/attempts/:id", (req, res) => {
  const attempt = getAttempt(req.params.id);

  if (!attempt) {
    return res.status(404).json({ error: "Attempt not found" });
  }

  res.json(attempt);
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`LLD backend running at http://localhost:${PORT}`);
});

export { app, server };
