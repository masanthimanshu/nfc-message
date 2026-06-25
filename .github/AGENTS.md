# Agent Guidance for NFC Message

This repository is a small AWS Serverless project that builds a text-generation backend using AWS Bedrock, DynamoDB, and Express.

## What to know first

- `package.json` defines the main commands:
  - `npm run dev` — start Serverless Offline for local testing
  - `npm run deploy` — deploy to AWS via Serverless Framework
- The project uses Node.js ESM and `package.json` path imports:
  - `#core/*` -> `./core/*`
  - `#data/*` -> `./data/*`
  - `#utils/*` -> `./utils/*`
- API route code lives under `src/text/`
  - `src/text/handler.js` — Lambda handler wrapper
  - `src/text/routes.js` — Express routes and middleware
  - `src/text/controller.js` — message generation controller

## Key architecture points

- `serverless.yaml` configures an HTTP API Lambda at `/text/{proxy+}`
- `utils/prompt.js` builds the LLM prompt from request data
- `core/bedrock_client.js` calls AWS Bedrock with a model and SSM system prompt
- `core/dynamo_client.js` persists input and generated response data into DynamoDB
- `data/validator.js` validates incoming request payloads with `zod`

## Important behavior to preserve

- The API expects JSON input with fields: `address`, `weather`, `homeTime`, `officeTime`, `latitude`, `longitude`, and `batteryLevel`
- `core/bedrock_client.js` relies on SSM parameter `/nfc-message/lambda/message`
- The DynamoDB table name comes from `TABLE_NAME` and is defined in `serverless.yaml`

## Useful references

- `README.md` — setup, usage examples, and deployment notes
- `serverless.yaml` — deployment, provider, and resource details
- `core/parameter_store.js` — AWS SSM integration point

## When editing code

- Keep Lambda entrypoint logic in `src/text/handler.js`
- Preserve the prompt generation flow in `utils/prompt.js`
- Avoid breaking the `#core/*`, `#data/*`, `#utils/*` alias imports
- If adding features, update both the serverless config and the README as needed
