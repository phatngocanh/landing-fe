#!/bin/bash
set -e

# Only reinstall if package.json changed in this merge
if git diff HEAD~1 HEAD --name-only 2>/dev/null | grep -q "package\.json"; then
  npm install --prefer-offline --no-audit --no-fund
fi
