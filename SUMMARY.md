# Serverless AI Messaging Backend

- Purpose: Built a cloud-native Node.js service that transforms location, weather, commute, and device-state data into personalized, context-aware messages using AWS Bedrock.
- Architecture: Designed a modular Express API deployed on AWS Lambda with Serverless Framework, backed by DynamoDB persistence, SSM Parameter Store, and schema validation for scalable, secure request handling.
- Core technologies: Node.js (ESM), Express, AWS Bedrock, DynamoDB, AWS Systems Manager, Lambda, CloudWatch, Serverless Framework, zod, and serverless-offline.
- Key contributions: Implemented prompt generation, Bedrock model integration, request validation, durable input/output storage, monitoring support through CloudWatch, and a health-check endpoint to support reliable, audit-ready AI workflows.
- Impact: Delivered an infrastructure-as-code, production-ready backend that accelerates AI-driven communications with strong backend state management, observability, maintainability, and operational resilience.
