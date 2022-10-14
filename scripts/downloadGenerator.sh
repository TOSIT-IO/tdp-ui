OPENAPI_JAR_URL=https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/6.2.0/openapi-generator-cli-6.2.0.jar

echo "Downloading $OPENAPI_JAR_URL"
wget --no-clobber $OPENAPI_JAR_URL -O openapi-generator-cli.jar
echo "Generating the API client..."
java -jar openapi-generator-cli.jar generate -i schemas/tdp-server_0.1.0_openapi.json -g typescript-axios -o build/tdp-sdk
