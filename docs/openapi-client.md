# Generate the API client SDK

The API client SDK is generated fom the OpenAPI schema provided by `tdp-server` using the [OpenAPI Generator](https://openapi-generator.tech/).

## Prerequistes

The generator is made with Java:

- Install [Java](https://www.java.com/).

## Automatic generation

A npm script is provided to both download the OpenAPI Generator CLI and generate the API client SDK:

```bash
npm run postinstall
```

Note: the `postinstall` npm script is automatically ran when doing `npm install`.

## Manual generation

1. Download the OpenAPI Generator CLI jar:
   ```bash
   wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/6.2.0/openapi-generator-cli-6.2.0.jar -O openapi-generator-cli.jar
   ```
2. Use the `openapi-generator-cli` to generate the API client SDK:
   ```bash
   java -jar openapi-generator-cli.jar generate \
     -i schemas/tdp-server_0.1.0_openapi.json \
     -g typescript \
     -o build/tdp-sdk
   ```
