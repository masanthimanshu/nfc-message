# NFC Message

A Serverless Node.js backend that generates context-aware WhatsApp-style text messages using AWS Bedrock and DynamoDB.

## What this project does

`nfc-message` receives structured inputs about a location, weather, commute times, and phone battery level. It builds a prompt for an LLM, calls AWS Bedrock to generate a personalized message, stores the request and response in DynamoDB, and returns the message over a simple HTTP API.

## Why it is useful

- Generates natural, situational messages from NFC-like location and device state data
- Keeps raw input and generated output together for auditability and replay
- Supports local development with `serverless-offline`
- Uses AWS Bedrock for model-based text generation and AWS Lambda for serverless deployment

## Key features

- HTTP API built with Express and Serverless Framework
- Input validation with `zod`
- Prompt composition based on location, time, weather, battery status, and commute state
- AWS Bedrock model invocation using `@aws-sdk/client-bedrock-runtime`
- DynamoDB persistence for both input and output records
- Health check endpoint for quick sanity testing

## Getting started

### Prerequisites

- Node.js 20+ (compatible with `nodejs24.x`)
- npm
- AWS credentials configured in your shell or environment
- AWS account with Bedrock access and permissions to deploy Lambda/DynamoDB

### Install dependencies

```bash
npm install
```

### Local development

Start the API locally with Serverless Offline:

```bash
npm run dev
```

The local API is mounted at `/text`.

### Example requests

#### Health check:

```bash
curl http://localhost:3000/text/health
```

#### Generate a message:

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

The service relies on these environment values:

- `CURRENT_AWS_REGION` — AWS region used by AWS SDK clients
- `TABLE_NAME` — DynamoDB table name

`serverless.yaml` sets:

- `CURRENT_AWS_REGION: ap-south-1`
- `TABLE_NAME: nfc-messages-table`

### Required AWS parameter

Create this SSM parameter before using the service:

- `/nfc-message/lambda/message`

This parameter provides the system prompt used by the Bedrock model.

## Deployment

Deploy the service using Serverless Framework:

```bash
npm run deploy
```

The function configuration is defined in `serverless.yaml`:

- handler: `src/text/handler.handler`
- HTTP API route: `/text/{proxy+}`
- method: `ANY`

## Project structure

- `serverless.yaml` — AWS Lambda/API config
- `src/text/handler.js` — Lambda handler bridging Express and Serverless
- `src/text/routes.js` — Express routes for health and message generation
- `src/text/controller.js` — core request flow and orchestration
- `utils/prompt.js` — prompt generation logic for message content
- `core/bedrock_client.js` — Bedrock model invocation and response parsing
- `core/dynamo_client.js` — DynamoDB persistence helpers
- `core/parameter_store.js` — SSM parameter retrieval
- `data/validator.js` — request validation middleware

## How it works

When a POST request is made to `/text/message`:

1. `data/validator.js` validates the request body
2. `utils/prompt.js` creates the prompt text from the input payload
3. `core/bedrock_client.js` invokes AWS Bedrock with the prompt
4. `core/dynamo_client.js` stores the input and generated output
5. The generated message is returned in the response
