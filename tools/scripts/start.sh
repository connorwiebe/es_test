#!/usr/bin/env bash

mkdir -p dist/sql
find src/ -type f -name '*.sql' -exec cp '{}' dist/sql ';'
NODE_ENV=$1 node ./dist/app.js