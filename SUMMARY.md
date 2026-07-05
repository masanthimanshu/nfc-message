# Serverless AI Messaging Backend

- Purpose: Built a serverless Node.js backend that transforms structured context such as location, weather, commute timing, and device state into personalized, context-aware text messages using AWS Bedrock.

- Architecture: Designed a modular Express API deployed on AWS Lambda with Serverless Framework, supported by DynamoDB persistence, SSM Parameter Store, and structured validation for scalable, secure request handling.

- Core technologies: Node.js (ESM), Express, AWS Bedrock, DynamoDB, AWS Systems Manager, Serverless Framework, zod, and serverless-offline.

- Key contributions: Implemented prompt construction, Bedrock model integration, request validation, durable input/output storage, and a health-check API to enable reliable, audit-ready message generation.

- Impact: Delivered an infrastructure-as-code, cloud-native service that supports fast, maintainable AI-driven communication workflows with strong backend state management and operational resilience.
