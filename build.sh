#!/usr/bin/env sh

set -e

tsc

printf 'import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";\n%s' \
    "$(cat ./src/index.js)" >src/index.js
