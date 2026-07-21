# Agent Guidance for NFC Message

This repository is a Serverless AWS backend that generates personalized text messages using AWS Bedrock, validates structured input, and stores both raw input and generated output in DynamoDB.

## Quick starter

- `npm install` to install dependencies.
- `npm run dev` to run Serverless Offline locally.
- `npm run deploy` to deploy the service with Serverless Framework.

## Core project boundaries

- `serverless.yaml` defines the Lambda function, HTTP API route, provider region, runtime, environment variables, and DynamoDB resource.
- `src/text/handler.js` bridges Express into AWS Lambda via `serverless-http`.
- `src/text/routes.js` defines `/text/health` and `/text/message` and applies validation.
- `src/text/controller.js` orchestrates prompt creation, Bedrock invocation, and persistence.
- `utils/prompt.js` composes the prompt from request payload fields.
- `core/bedrock_client.js` loads the system prompt from SSM and invokes Bedrock.
- `core/dynamo_client.js` writes the input and output records to DynamoDB.
- `data/validator.js` validates request payloads using `zod`.
- `core/parameter_store.js` reads SSM parameters used by Bedrock.

## Important conventions

- Use ESM imports and the path aliases defined in `package.json`:
  - `#core/*` -> `./core/*`
  - `#data/*` -> `./data/*`
  - `#utils/*` -> `./utils/*`
- Local development runs with Serverless Offline; the route base is `/text`.
- `/text/message` requires strict JSON with these fields:
  - `address`, `weather`, `homeTime`, `officeTime`, `latitude`, `longitude`, `batteryLevel`
- The Bedrock model is `google.gemma-3-12b-it`.
- Bedrock uses the SSM parameter `/nfc-message/lambda/message` to load system instructions.
- `data/messages.json` provides the fixed conversation history used for Bedrock requests.
- DynamoDB writes two items per request: an `input` item and an `output` item sharing the same `id`.

## Request handling flow

1. `src/text/routes.js` receives the request and applies `validatedInput`.
2. `src/text/controller.js` calls `createPrompt(req.body)`.
3. `core/bedrock_client.js` invokes Bedrock with `system_instruction` and a user message payload.
4. `core/dynamo_client.js` writes input metadata and generated output separately.
5. The response returns `{ message }`.

## Common edits and how to handle them

- API contract changes: update `src/text/routes.js`, `data/validator.js`, and `README.md`.
- Prompt or message-generation changes: update `utils/prompt.js`.
- Bedrock integration changes: update `core/bedrock_client.js`; keep SSM parameter handling intact.
- Persistence changes: update `core/dynamo_client.js` and verify `TABLE_NAME` remains configured.

## Notes for agents

- Do not migrate code to CommonJS; this repo is ESM-first.
- Preserve the route base `/text` for local offline testing.
- Keep API behavior and response shape stable when editing controller or persistence.
- Use `README.md` for setup and deployment context, not as the source of truth for code behavior.

## References

- `README.md` for setup, local testing, and deployment instructions.
- `serverless.yaml` for provider, runtime, environment variables, and resource definitions.
- `core/parameter_store.js` for AWS SSM parameter retrieval.
- `data/messages.json` for Bedrock conversation history.
