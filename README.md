# NFC Message

A Serverless Node.js backend that generates context-aware WhatsApp-style messages using AWS Bedrock and DynamoDB.

## What the project does

`nfc-message` accepts structured input about location, weather, commute times, and device battery level. It composes a prompt, calls AWS Bedrock to generate a personalized message, stores both request and response records in DynamoDB, and exposes a simple HTTP API for consumption.

## Why it is useful

- Generates natural, situational text messages from context data
- Preserves input and output records for auditability and replay
- Supports local development using `serverless-offline`
- Uses AWS Bedrock for LLM-powered content generation and AWS Lambda for serverless deployment

## Key features

- Express-based HTTP API wrapped for AWS Lambda
- Request validation using `zod`
- Prompt generation from location, weather, commute, and battery state
- AWS Bedrock integration via `@aws-sdk/client-bedrock-runtime`
- DynamoDB persistence for both input and output items
- Health check endpoint for quick sanity testing

## Getting started

### Prerequisites

- Node.js 20+
- npm
- AWS credentials configured in your shell or environment
- AWS account with Bedrock access and permissions to deploy Lambda and DynamoDB resources

### Install dependencies

```bash
npm install
```

### Local development

Start the API locally with Serverless Offline:

```bash
npm run dev
```

The service is mounted at `/text` by default.

### Example requests

#### Health check

```bash
curl http://localhost:3000/text/health
```

#### Generate a message

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

## Configuration

Environment variables used by the service:

- `CURRENT_AWS_REGION` — AWS SDK region
- `TABLE_NAME` — DynamoDB table name

`serverless.yaml` configures:

- `CURRENT_AWS_REGION: ap-south-1`
- `TABLE_NAME: nfc-messages-table`

### Required SSM parameter

The service expects an SSM parameter at `/nfc-message/lambda/message` containing the system prompt for Bedrock.

## Deployment

Deploy with the Serverless Framework:

```bash
npm run deploy
```

Deployment is defined in `serverless.yaml` with:

- handler: `src/text/handler.handler`
- HTTP API path: `/text/{proxy+}`
- method: `ANY`

## Project structure

- `serverless.yaml` — AWS Lambda and API config
- `aws/database.yaml` — DynamoDB table CloudFormation resource
- `aws/iam.yaml` — IAM permissions for the Lambda function
- `src/text/handler.js` — Lambda handler using `serverless-http`
- `src/text/routes.js` — Express routes for `/health` and `/message`
- `src/text/controller.js` — request workflow orchestration
- `utils/prompt.js` — prompt construction from request payload
- `core/bedrock_client.js` — Bedrock invocation and response parsing
- `core/dynamo_client.js` — DynamoDB persistence helpers
- `core/parameter_store.js` — SSM parameter retrieval
- `data/validator.js` — input validation middleware

## How it works

1. `data/validator.js` validates the incoming request body
2. `utils/prompt.js` constructs a prompt from the payload
3. `core/bedrock_client.js` invokes AWS Bedrock with the prompt
4. `core/dynamo_client.js` writes input and output records to DynamoDB
5. The generated message is returned in the HTTP response
