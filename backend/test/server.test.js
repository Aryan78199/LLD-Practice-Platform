import test, { after } from "node:test";
import assert from "node:assert/strict";
import { server } from "../src/server.js";

const base = "http://localhost:4000";

after(() => {
  server.close();
});

test("health endpoint works", async () => {
  const response = await fetch(`${base}/api/health`);
  assert.equal(response.status, 200);

  const data = await response.json();
  assert.equal(data.status, "ok");
});

test("unknown problem returns 404", async () => {
  const response = await fetch(`${base}/api/problems/not-real`);
  assert.equal(response.status, 404);
});

test("empty submission returns 400", async () => {
  const response = await fetch(`${base}/api/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      problemId: "parking-lot",
      solution: ""
    })
  });

  assert.equal(response.status, 400);
});
