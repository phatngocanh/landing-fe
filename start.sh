#!/bin/sh

# Runtime config: write the API URL into public/runtime-config.js so the
# browser bundle can read it via window.__RUNTIME_CONFIG__ without rebuilding
# the image. Mirrors management-app-frontend.

API_URL=${NEXT_PUBLIC_API_URL:-"http://localhost:8080"}

cat > public/runtime-config.js << EOF
window.__RUNTIME_CONFIG__ = {
  NEXT_PUBLIC_API_URL: "${API_URL}"
};
EOF

exec node server.js
