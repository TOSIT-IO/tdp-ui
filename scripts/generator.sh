#!/usr/bin/env bash

set -euo pipefail

readonly JAR_FILE=openapi-generator-cli.jar
readonly OPENAPI_JAR_URL=${OPENAPI_JAR_URL:-https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/6.2.0/openapi-generator-cli-6.2.0.jar}
readonly SCHEMA_FILE=tdp-server_0.1.0_openapi.json
readonly SCHEMA_PATH=schemas/$SCHEMA_FILE
readonly HASH_PATH=build/$SCHEMA_FILE.sha256
readonly BUILD_PATH=build/tdp-sdk

FORCE_OPENAPI_GEN=false

print_help() {
  cat <<EOF
SYNOPSIS
  Generate an API client SDK with OpenAPI Generator.

USAGE
  generator.sh [-fh]

OPTIONS
  -f Force client generation.
  -h Print help.
EOF
}

parse_cmdline() {
  local OPTIND
  while getopts 'hf' options; do
    case "$options" in
    f) FORCE_OPENAPI_GEN=true ;;
    h) print_help && exit 0 ;;
    *) print_help && exit 1 ;;
    esac
  done
  shift $((OPTIND - 1))
  return 0
}

download() {
  echo "Downloading $OPENAPI_JAR_URL"
  wget --no-clobber $OPENAPI_JAR_URL -O openapi-generator-cli.jar || true
}

generate() {
  if [[ $FORCE_OPENAPI_GEN == "false" && -d $BUILD_PATH ]] && sha256sum --check $HASH_PATH
  then
      echo "No schema change. Skipping client generation."
      exit 0
  fi
  echo "Generating the API client..."
  java -jar $JAR_FILE generate -i $SCHEMA_PATH -g typescript-fetch -o $BUILD_PATH --additional-properties=useSingleRequestParameter=false
  sha256sum $SCHEMA_PATH > "$HASH_PATH"
}

main() {
  parse_cmdline "$@" || { print_help; exit 1; }

  download
  generate
}

main "$@"
