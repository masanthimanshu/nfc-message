# NFC Contextual Message Generator — Executive Summary & Resume Highlights

A serverless, event-driven AI microservice that transforms real-time mobile device telemetry (GPS coordinates, transit estimates, battery status, and weather) into context-aware, personalized WhatsApp messages via **Google Gemma 3 (12B)** on **AWS Bedrock**, triggered instantly by physical NFC tags and mobile automations.

---

## 🎯 Project Overview & Purpose

- **Problem**: Manually writing routine commute and situational updates (leaving work, heading home, low battery warnings) while commuting or traveling is inconvenient and time-consuming.
- **Solution**: Developed a low-latency serverless microservice that accepts device sensor telemetry from an NFC tap or iOS Shortcut, resolves geospatial and temporal context, dynamically queries an LLM on AWS Bedrock, and returns a tailored message ready for immediate delivery.
- **Value**: Provides effortless, one-tap mobile communication with zero-maintenance, on-demand serverless cloud infrastructure.

---

## 🛠️ Core Technologies & Architecture

- **Runtime & Backend**: Node.js 24.x (ESM, subpath imports), Express 5, `serverless-http`
- **Serverless & Cloud**: AWS Lambda, AWS HTTP API Gateway, Serverless Framework v4 (IaC)
- **Generative AI & LLM Orchestration**: AWS Bedrock (`google.gemma-3-12b-it`), few-shot prompt grounding
- **Configuration & Security**: AWS SSM Parameter Store (dynamic system instructions), AWS IAM (least-privilege role policies)
- **Database & Persistence**: Amazon DynamoDB (Single-Table Design, `PAY_PER_REQUEST` on-demand billing)
- **Data Validation & Geospatial**: Zod 4 runtime schema validation, `geolib` proximity engine
- **Observability & CI/CD**: Structured JSON logging (Amazon CloudWatch), GitHub Actions automated deployment pipeline

---

## 🚀 Key Technical Contributions & Capabilities

- **Context-Aware Prompt Engineering**: Engineered a deterministic context engine analyzing real-time GPS coordinates against geofenced reference points (Home/Office), evaluating battery levels (<20% safety threshold), and factoring in IST schedule windows to generate situational LLM prompts.
- **Decoupled System Prompts via AWS SSM**: Decoupled prompt instructions from application code using AWS SSM Parameter Store, allowing instant tuning of AI tone, persona, and length without triggering Lambda redeployments.
- **Optimized Serverless Architecture**: Built an ultra-lightweight REST API on Node.js 24 and Express 5 deployed to AWS Lambda via Serverless Framework, ensuring sub-second response times and cost-effective scale-to-zero execution.
- **Audit Logging with DynamoDB Single-Table Design**: Designed a transactional DynamoDB document schema tracking both raw client telemetry and generated AI responses under a shared UUID with conditional write guards for data integrity.
- **Schema Validation & Robust Observability**: Enforced strict input sanitization with Zod middleware, preventing malformed payload processing and integrating structured JSON logging for real-time CloudWatch diagnostics.
- **Automated CI/CD Pipeline**: Configured a zero-touch GitHub Actions pipeline automating linting, packaging, and deployments to AWS across branches.

---

## 📈 Measurable Outcomes & Business Value

- **Zero Idle Infrastructure Cost**: Serverless architecture (Lambda + DynamoDB Pay-Per-Request) eliminates fixed server overhead, scaling compute and database costs to exact usage.
- **Zero-Downtime Prompt Iteration**: Externalized SSM Parameter Store configuration decreased prompt iteration cycles from standard build-deploy intervals to instantaneous runtime updates.
- **Sub-Second Latency**: Efficient ESM imports and streamlined invocation pipeline ensure rapid response generation suitable for immediate mobile webhook execution.
- **100% Automated Workflow**: Replaced manual typing of routine transit updates with a single physical NFC tag tap.

---

## 📄 ATS-Optimized Resume Bullet Points

```markdown
• Architected an event-driven serverless AI backend using AWS Lambda (Node.js 24), Express 5, and Serverless Framework v4, achieving sub-second response times and 100% pay-per-use cost efficiency.
• Integrated Google Gemma 3 (12B) on AWS Bedrock with few-shot prompt grounding and dynamic system instructions managed via AWS Systems Manager (SSM) Parameter Store.
• Engineered a geospatial context engine utilizing geolib and real-time device telemetry (GPS geofencing, transit time, battery levels) to generate intelligent situational message prompts.
• Designed a single-table Amazon DynamoDB schema with conditional writes for dual-record audit tracking of input telemetry and AI-generated outputs.
• Implemented end-to-end request validation using Zod and established an automated CI/CD pipeline via GitHub Actions for zero-touch cloud deployments.
```
