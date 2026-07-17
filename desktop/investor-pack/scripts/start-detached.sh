#!/usr/bin/env bash
# Start mentor-pack Vite (+ optional Electron) fully detached from the parent shell.
# Survives agent/session SIGTERM that kills attached `npm run dev` process groups.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOG_DIR="${INVESTOR_PACK_LOG_DIR:-/tmp/investor-pack-dev}"
mkdir -p "$LOG_DIR"
cd "$ROOT"

MODE="${1:-all}" # all | web | electron

npm run prepare:mentor

python3 - "$ROOT" "$LOG_DIR" "$MODE" <<'PY'
import os, signal, sys, time, urllib.request
from pathlib import Path

PACK, LOG, MODE = Path(sys.argv[1]), Path(sys.argv[2]), sys.argv[3]

def daemonize_and_exec(cmd, logfile, pidfile, env_extra=None):
    if os.fork() > 0:
        for _ in range(80):
            if pidfile.exists():
                return pidfile.read_text().strip()
            time.sleep(0.05)
        return None
    os.setsid()
    if os.fork() > 0:
        os._exit(0)
    os.chdir(PACK)
    os.umask(0)
    logf = open(logfile, "a", buffering=1)
    os.dup2(logf.fileno(), 1)
    os.dup2(logf.fileno(), 2)
    os.dup2(open("/dev/null", "r").fileno(), 0)
    signal.signal(signal.SIGHUP, signal.SIG_IGN)
    env = os.environ.copy()
    env.pop("ELECTRON_RUN_AS_NODE", None)
    if env_extra:
        env.update(env_extra)
    pidfile.write_text(str(os.getpid()) + "\n")
    os.execvpe(cmd[0], cmd, env)

if MODE in ("all", "web"):
    (LOG / "vite.log").write_text("")
    (LOG / "vite.pid").unlink(missing_ok=True)
    daemonize_and_exec([str(PACK / "node_modules/.bin/vite")], LOG / "vite.log", LOG / "vite.pid")
    for _ in range(60):
        try:
            urllib.request.urlopen("http://localhost:5173/", timeout=0.5)
            break
        except Exception:
            time.sleep(0.25)
    else:
        sys.exit("Vite failed to become ready; see " + str(LOG / "vite.log"))
    print(f"Vite up at http://localhost:5173/ (pid {(LOG/'vite.pid').read_text().strip()})")

if MODE in ("all", "electron"):
    (LOG / "electron.log").write_text("")
    (LOG / "electron.pid").unlink(missing_ok=True)
    daemonize_and_exec(
        [str(PACK / "node_modules/.bin/electron"), "."],
        LOG / "electron.log",
        LOG / "electron.pid",
        env_extra={"VITE_DEV_SERVER_URL": "http://localhost:5173"},
    )
    time.sleep(1.5)
    print(f"Electron started (pid {(LOG/'electron.pid').read_text().strip()})")
    print("Login works in the Electron window (browser has no preload IPC).")

print(f"Logs: {LOG}")
PY
