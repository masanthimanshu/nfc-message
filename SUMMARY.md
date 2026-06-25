# NFC Message

A serverless Node.js backend that converts location, weather, commute, and device state data into personalized, context-aware messages using AWS Bedrock.

- Purpose: Deliver an API-driven messaging service that generates NFC-style text content from structured input and persists both requests and LLM responses for auditability.
- Architecture: Modular Express API deployed as AWS Lambda via Serverless Framework, backed by DynamoDB persistence and SSM Parameter Store for prompt configuration.
- Core technologies: Node.js ESM, AWS Bedrock, DynamoDB, SSM, Serverless Framework, Express, `zod`, `@aws-sdk/client-bedrock-runtime`, and `serverless-offline`.
- Contributions: Implements prompt composition, structured validation, Bedrock model invocation, durable input/output storage, and local development support.
- Impact: Provides scalable, infrastructure-as-code AWS backend capabilities for automated, conversational message generation with secure, audit-ready data flow.
