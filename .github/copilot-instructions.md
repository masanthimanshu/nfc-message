# Copilot Instructions

This repository is a Serverless Node.js backend that generates NFC-style context-aware text messages via AWS Bedrock, stores request and response records in DynamoDB, and exposes an Express API over Lambda.

## Primary goals

- Preserve the API contract in `src/text/routes.js`, especially `/text/message` and `/text/health`.
- Keep prompt generation in `utils/prompt.js` and Bedrock integration in `core/bedrock_client.js`.
- Keep persistence logic in `core/dynamo_client.js` and Serverless deployment configuration in `serverless.yaml`.

## Key conventions

- This repo uses ESM imports and package aliases defined in `package.json`:
  - `#core/*` -> `./core/*`
  - `#data/*` -> `./data/*`
  - `#utils/*` -> `./utils/*`
- Local development runs with Serverless Offline via `npm run dev`, and the route base is mounted at `/text`.
- `/text/message` requires strict JSON with these fields:
  - `address`, `weather`, `homeTime`, `officeTime`, `latitude`, `longitude`, `batteryLevel`
- Bedrock uses the SSM parameter `/nfc-message/lambda/message` for the system prompt and the model `google.gemma-3-12b-it`.
- DynamoDB persistence writes two items per request: an `input` item and an `output` item sharing the same `id`.

## Use this file as a quick guide

For more detailed workspace-specific guidance, see `.github/AGENTS.md`.
