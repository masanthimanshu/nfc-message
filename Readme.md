# NFC Message

A Serverless AWS backend that generates personal text messages from NFC-style location and device state inputs.

The service receives location, weather, and battery status data, builds a prompt for an AWS Bedrock LLM, stores input/output records in DynamoDB, and returns a generated WhatsApp-style message.

## Why this project is useful

- Provides a lightweight API for generating context-aware text messages.
- Uses AWS Bedrock to create natural, personalized message content.
- Stores both raw inputs and generated outputs in DynamoDB for later analysis.
- Supports local development with `serverless-offline`.

## Features

- HTTP API built with Express and Serverless Framework
- Input validation using `zod`
- Prompt creation based on location, time, weather, battery, and commute state
- AWS Bedrock model invocation via `@aws-sdk/client-bedrock-runtime`
- DynamoDB persistence for input and generated message records
- Health check endpoint for basic status monitoring

## Project structure

- `serverless.yaml` - AWS Lambda / API route configuration
- `src/text/handler.js` - Lambda handler wiring Express routes to Serverless
- `src/text/routes.js` - API routes and middleware
- `src/text/controller.js` - main controller for message generation
- `utils/prompt.js` - prompt assembly logic for the LLM
- `core/bedrock_client.js` - Bedrock model invocation
- `core/dynamo_client.js` - DynamoDB persistence helpers
- `core/parameter_store.js` - SSM parameter retrieval
- `data/validator.js` - request validation logic using `zod`

## Prerequisites

- Node.js 20+ or compatible with `nodejs24.x`
- npm
- AWS credentials configured in your environment
- AWS account with Bedrock access and permissions to deploy Lambda/DynamoDB

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables if needed:

- `CURRENT_AWS_REGION` is set in `serverless.yaml` to `ap-south-1`
- `TABLE_NAME` is set to `nfc-messages-table`

3. Make sure the following AWS SSM parameter exists:

- `/nfc-message/lambda/message`

This parameter is used as the system prompt when calling Bedrock.

## Local development

Start the API locally with Serverless Offline:

```bash
npm run dev
```

The local route base is mounted at `/text`.

### Example local requests

Health check:

```bash
curl http://localhost:3000/text/health
```

Generate a message:

```bash
curl -X POST http://localhost:3000/text/message \
  -H "Content-Type: application/json" \
  -d '{
    "address": "MG Road, Bangalore",
    "weather": "sunny",
    "homeTime": "19:00",
    "latitude": "12.9716",
    "longitude": "77.5946",
    "officeTime": "09:30",
    "batteryLevel": "45"
  }'
```

## Deployment

Deploy the service using the Serverless Framework:

```bash
npm run deploy
```

The function is configured in `serverless.yaml` as:

- path: `/text/{proxy+}`
- method: `ANY`
- handler: `src/text/handler.handler`

## Runtime behavior

When a request is posted to `/text/message`:

1. Input data is validated via `data/validator.js`
2. A prompt is composed in `utils/prompt.js`
3. AWS Bedrock is called in `core/bedrock_client.js`
4. Input and generated output are stored in DynamoDB
5. The generated message is returned to the caller

## Environment details

- DynamoDB table: `nfc-messages-table`
- Bedrock model: `google.gemma-3-12b-it`
- Primary AWS region: `ap-south-1`

## Getting help

- Open an issue or submit a pull request on the repository
- Check AWS Bedrock and Serverless Framework documentation for deployment issues
- Inspect Lambda logs for runtime diagnostics

## Contributing

Contributions are welcome. Open issues for bug reports or feature requests, and send pull requests for code changes.

If you add formal contribution guidance, link it here as `CONTRIBUTING.md`.

## License

This project is licensed under the terms defined in `package.json`.
