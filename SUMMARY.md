# NFC Message

A serverless backend for generating context-aware WhatsApp-style messages using AWS Bedrock and DynamoDB.

- Purpose: Provides an API that converts location, weather, battery, and commute data into personalized text prompts for conversational LLM generation.
- Architecture: Node.js ESM microservice deployed with Serverless Framework, using Express for routing and AWS Lambda for execution.
- Core technologies: AWS Bedrock, DynamoDB, SSM Parameter Store, Serverless Framework, Express, `zod` validation, and `@aws-sdk`.
- Contributions: Builds prompt generation logic, validates structured input, persists both inputs and generated output, and supports local development with Serverless Offline.
- Value: Enables scalable, infrastructure-as-code backed text generation for mobile or NFC-triggered messaging workflows with audit-ready data storage.
