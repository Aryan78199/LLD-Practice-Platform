import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "./config";

const API = API_BASE_URL;

function App() {
  const [problems, setProblems] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [solution, setSolution] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const selectedProblem = useMemo(
    () => problems.find((p) => p.id === selectedId),
    [problems, selectedId]
  );

  async function loadData() {
    try {
      setLoading(true);
      const [problemRes, attemptRes] = await Promise.all([
        fetch(`${API}/problems`),
        fetch(`${API}/attempts`)
      ]);

      if (!problemRes.ok || !attemptRes.ok) {
        throw new Error("Backend is not reachable.");
      }

      const problemData = await problemRes.json();
      const attemptData = await attemptRes.json();

      setProblems(problemData);
      setAttempts(attemptData);

      if (!selectedId && problemData.length) {
        setSelectedId(problemData[0].id);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function submitSolution(event) {
    event.preventDefault();
    setError("");

    if (!selectedProblem) return;

    try {
      setSubmitting(true);

      const response = await fetch(`${API}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: selectedProblem.id,
          solution
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed.");
      }

      setResult(data);
      setAttempts((current) => [data, ...current]);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function chooseProblem(id) {
    setSelectedId(id);
    setResult(null);
    setSolution("");
    setError("");
  }

  function retry() {
    setResult(null);
    setSolution("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const selectedAttempts = attempts.filter(
    (attempt) => attempt.problemId === selectedId
  );

  if (loading) {
    return <div className="center">Loading LLD Practice Platform...</div>;
  }

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">2-Day Engineering Assignment</p>
          <h1>LLD Practice Platform</h1>
          <p className="heroText">
            Practice Low-Level Design, submit a solution, receive structured
            feedback, and try again.
          </p>
        </div>
        <div className="heroBadge">Practice → Submit → Feedback</div>
      </header>

      {error && <div className="error">{error}</div>}

      <main className="layout">
        <aside className="sidebar card">
          <div className="sectionTitle">
            <h2>Problems</h2>
            <span>{problems.length}</span>
          </div>

          {problems.map((problem) => (
            <button
              key={problem.id}
              className={`problemButton ${
                selectedId === problem.id ? "active" : ""
              }`}
              onClick={() => chooseProblem(problem.id)}
            >
              <strong>{problem.title}</strong>
              <small>{problem.difficulty}</small>
            </button>
          ))}

          <div className="historyBlock">
            <div className="sectionTitle">
              <h2>My Attempts</h2>
              <span>{selectedAttempts.length}</span>
            </div>

            {selectedAttempts.length === 0 ? (
              <p className="muted">No attempts yet.</p>
            ) : (
              selectedAttempts.map((attempt, index) => (
                <div className="attemptItem" key={attempt.id}>
                  <span>Attempt {selectedAttempts.length - index}</span>
                  <strong>{attempt.evaluation.score}/10</strong>
                </div>
              ))
            )}
          </div>
        </aside>

        <section className="content">
          {selectedProblem && !result && (
            <form onSubmit={submitSolution}>
              <div className="card problemCard">
                <div className="problemHeader">
                  <div>
                    <p className="eyebrow">LLD Problem</p>
                    <h2>{selectedProblem.title}</h2>
                  </div>
                  <span className="difficulty">
                    {selectedProblem.difficulty}
                  </span>
                </div>

                <p className="description">{selectedProblem.description}</p>

                <h3>Requirements</h3>
                <ol>
                  {selectedProblem.requirements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>

                <div className="hintBox">
                  <strong>Design hints</strong>
                  <ul>
                    {selectedProblem.hints.map((hint) => (
                      <li key={hint}>{hint}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card editorCard">
                <div className="editorHeader">
                  <div>
                    <h2>Your Solution</h2>
                    <p>Write classes, interfaces, relationships and reasoning.</p>
                  </div>
                  <span>{solution.length} chars</span>
                </div>

                <textarea
                  value={solution}
                  onChange={(event) => setSolution(event.target.value)}
                  placeholder={`Example:\ninterface SpotAllocationStrategy {}\nclass ParkingLot {}\nclass ParkingSpot {}\n...\nExplain responsibilities and design patterns.`}
                />

                <button className="submitButton" disabled={submitting}>
                  {submitting ? "Evaluating..." : "Submit Solution"}
                </button>
              </div>
            </form>
          )}

          {result && (
            <div className="resultStack">
              <div className="card scoreCard">
                <div>
                  <p className="eyebrow">Evaluation Result</p>
                  <h2>{selectedProblem.title}</h2>
                </div>
                <div className="score">{result.evaluation.score}/10</div>
              </div>

              <FeedbackSection
                title="Strengths"
                items={result.evaluation.strengths}
                type="success"
              />
              <FeedbackSection
                title="Issues"
                items={result.evaluation.issues}
                type="warning"
              />
              <FeedbackSection
                title="Suggestions"
                items={result.evaluation.suggestions}
                type="info"
              />

              <div className="card solutionPreview">
                <h3>Submitted solution</h3>
                <pre>{result.solution}</pre>
              </div>

              <div className="actions">
                <button className="secondaryButton" onClick={retry}>
                  Try Again
                </button>
                <button className="secondaryButton" onClick={() => setResult(null)}>
                  Back to Problem
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer>
        LLD Practice Platform · Focused MVP for engineering assignment
      </footer>
    </div>
  );
}

function FeedbackSection({ title, items, type }) {
  return (
    <div className={`card feedback ${type}`}>
      <h3>{title}</h3>
      {items.length === 0 ? (
        <p className="muted">No items.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
