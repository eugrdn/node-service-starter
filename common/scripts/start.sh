#!/bin/bash
concurrently "npm run watch:ts" "npm run watch:server"