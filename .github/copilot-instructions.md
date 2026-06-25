# Copilot Instructions

This repository is a serverless Node.js backend that generates text messages using AWS Bedrock, persists data in DynamoDB, and exposes an Express-based HTTP API.

## Primary goals

- Preserve the existing API contract in `src/text/routes.js`.
- Keep prompt-building logic in `utils/prompt.js` and Bedrock invocation in `core/bedrock_client.js`.
- Ensure deployment works through `serverless.yaml` and `npm run deploy`.

## Important conventions

- Use ESM imports and the path alias mappings defined in `package.json`:
  - `#core/*` -> `./core/*`
  - `#data/*` -> `./data/*`
  - `#utils/*` -> `./utils/*`
- The local dev path is `/text` when using Serverless Offline.
- Required request body fields for `/text/message`:
  - `address`, `weather`, `homeTime`, `officeTime`, `latitude`, `longitude`, `batteryLevel`
- Bedrock uses system prompt from AWS SSM parameter `/nfc-message/lambda/message`.

## Recommended file references

- `README.md` for setup and usage
- `serverless.yaml` for AWS deployment and resources
- `AGENTS.md` for broader agent guidance

## When troubleshooting

- Check `core/dynamo_client.js` for DynamoDB write behavior
- Check `core/bedrock_client.js` for model invocation and SSM lookups
- Validate JSON payloads with `data/validator.js`
