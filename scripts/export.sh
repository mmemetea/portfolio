#!/bin/sh
# Build the static export for GitHub Pages (mmemetea.github.io/portfolio).
# Keystatic is a dev-time, localhost-only admin over local files — its UI and
# API routes cannot exist in an export build, so they are set aside for the
# duration of the build and restored afterwards (also on failure).
set -e
mkdir -p .export-tmp
mv app/keystatic .export-tmp/keystatic
mv app/api/keystatic .export-tmp/api-keystatic
trap 'mv .export-tmp/keystatic app/keystatic; mv .export-tmp/api-keystatic app/api/keystatic; rm -rf .export-tmp' EXIT

EXPORT_MODE=1 npx next build
