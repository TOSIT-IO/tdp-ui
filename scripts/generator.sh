#!/usr/bin/env bash

OPENAPI_JAR_URL=https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/6.2.0/openapi-generator-cli-6.2.0.jar
HASH_FILE="build/tdp-server_0.1.0_openapi.json.sha256"

echo "Downloading $OPENAPI_JAR_URL"
wget --no-clobber $OPENAPI_JAR_URL -O openapi-generator-cli.jar
if [[ -z "$FORCE_OPENAPI_GEN" && -d "build/tdp-sdk" ]] && sha256sum --check "$HASH_FILE"
then
    echo "No schema change. Skipping client generation..."
    echo "If you want to force client generation, set the variable 'FORCE_OPENAPI_GEN=TRUE'"
    exit 0
fi
echo "Generating the API client..."
java -jar openapi-generator-cli.jar generate -i schemas/tdp-server_0.1.0_openapi.json -g typescript-fetch -o build/tdp-sdk --additional-properties=useSingleRequestParameter=false
sha256sum schemas/tdp-server_0.1.0_openapi.json > "$HASH_FILE"
