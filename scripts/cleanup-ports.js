import { execSync } from 'node:child_process';

const ports = [4000, 5173, 5174, 5175, 5176];

for (const port of ports) {
  try {
    const output = execSync(
      `powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-NetTCPConnection -LocalPort ${port} -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"`,
      { stdio: ['ignore', 'pipe', 'pipe'] }
    );
    if (output && output.toString().trim()) {
      console.log(`Released port ${port}`);
    }
  } catch {
    // Ignore failures for ports not in use
  }
}

console.log('Port cleanup complete.');
