#!/bin/bash

mkdir "$TDP_RUN_DIRECTORY"
mkdir -p "$(dirname $TDP_COLLECTION_PATH)"
mkdir -p "$TDP_VARS"

[[ ! -d "$TDP_COLLECTION_PATH" ]] && git clone https://github.com/TOSIT-IO/tdp-collection "$TDP_COLLECTION_PATH"
PYTHONPATH="/tdp" python3 /tdp/tdp_server/initialize_tdp_vars.py

. /entrypoint.sh
