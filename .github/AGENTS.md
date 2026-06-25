# Agent Guidance for NFC Message

This repository is a Serverless AWS backend that generates personalized text messages using AWS Bedrock, validates structured input, and stores both raw and generated data in DynamoDB.

## Quick starter

- `npm install` to install dependencies.
- `npm run dev` to run Serverless Offline locally.
- `npm run deploy` to deploy the service with Serverless Framework.

## Core project boundaries

- `serverless.yaml` defines the Lambda function, HTTP API route, region, and DynamoDB resource.
- `src/text/handler.js` wires Express routes into Serverless Lambda.
- `src/text/routes.js` exposes `/text/health` and `/text/message` with validation middleware.
- `src/text/controller.js` builds the prompt, invokes Bedrock, and persists records.
- `utils/prompt.js` composes the user prompt from request data.
- `core/bedrock_client.js` loads system instructions from SSM and calls Bedrock.
- `core/dynamo_client.js` writes input and output records to DynamoDB.
- `data/validator.js` enforces strict request schema with `zod`.

## Important behavior

- The `/text/message` endpoint requires exact fields:
  - `address`, `weather`, `homeTime`, `officeTime`, `latitude`, `longitude`, `batteryLevel`
- The local route base is `/text` when running Serverless Offline.
- Bedrock uses the SSM prompt key `/nfc-message/lambda/message` and the model ID `google.gemma-3-12b-it`.
- DynamoDB writes two items per request: an `input` item and an `output` item. Both use the same `id` and a `type` attribute.
- `TABLE_NAME` is provided via environment variables in `serverless.yaml`.

## Common edits and how to handle them

- When changing the API contract, update `src/text/routes.js`, `data/validator.js`, and `README.md`.
- When changing prompt content or structure, update `utils/prompt.js` only.
- When changing Bedrock behavior, update `core/bedrock_client.js` and keep SSM parameter handling intact.
- When changing persistence, update `core/dynamo_client.js` and ensure the table environment variable remains consistent.

## References

- `README.md` for setup, local testing, and deployment instructions.
- `serverless.yaml` for provider, runtime, region, and DynamoDB configuration.
- `core/parameter_store.js` for AWS SSM parameter retrieval.
- `README.md` and `SUMMARY.md` for project intent and architecture context.
