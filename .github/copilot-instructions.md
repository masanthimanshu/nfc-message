# Copilot Instructions

This repository is a Serverless Node.js backend that generates NFC-style context-aware text messages via AWS Bedrock, stores input/output records in DynamoDB, and exposes an Express API over Lambda.

## Primary goals

- Preserve the API contract in `src/text/routes.js`, especially `/text/message` and `/text/health`.
- Keep prompt construction in `utils/prompt.js` and Bedrock calls in `core/bedrock_client.js`.
- Keep persistence logic in `core/dynamo_client.js` and maintain the Serverless deployment flow in `serverless.yaml`.

## Important conventions

- Use ESM imports and the path aliases defined in `package.json`.
  - `#core/*` -> `./core/*`
  - `#data/*` -> `./data/*`
  - `#utils/*` -> `./utils/*`
- Local development uses Serverless Offline with the route base mounted at `/text`.
- `/text/message` expects strict JSON input with these required fields:
  - `address`, `weather`, `homeTime`, `officeTime`, `latitude`, `longitude`, `batteryLevel`
- Bedrock system prompt is loaded from SSM parameter `/nfc-message/lambda/message` and the model is `google.gemma-3-12b-it`.
- DynamoDB writes two records per request: input and generated output, both using the same `id` and a `type` attribute.

## Recommended references

- `README.md` for setup, local testing, and deployment instructions
- `serverless.yaml` for AWS Lambda/API configuration and environment variables
- `.github/AGENTS.md` for detailed code and behavior guidance

## When troubleshooting

- Check `core/dynamo_client.js` for persistence and item shape
- Check `core/bedrock_client.js` for Bedrock invocation, system prompt loading, and JSON parsing
- Check `data/validator.js` for the request validation middleware
