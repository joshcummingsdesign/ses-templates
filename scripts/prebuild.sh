#!/usr/bin/env sh

set -ex

rm -rf dist
mkdir -p dist/templates/public
cp -r src/templates/public dist/templates/
