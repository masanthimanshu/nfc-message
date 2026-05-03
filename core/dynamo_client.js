import crypto from "node:crypto";
import { logger } from "#core/runtime_logs.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient({ region: process.env.CURRENT_AWS_REGION });
const docClient = DynamoDBDocumentClient.from(dbClient);

export async function writeInputData(data) {
  const id = crypto.randomUUID();
  const timestamp = new Date().toISOString();

  const params = {
    TableName: process.env.TABLE_NAME,
    ExpressionAttributeNames: { "#type": "type" },
    Item: { id, type: "input", ...data, timestamp },
    ConditionExpression:
      "attribute_not_exists(id) AND attribute_not_exists(#type)",
  };

  try {
    await docClient.send(new PutCommand(params));
    return { id };
  } catch (err) {
    logger.error("Error writing input data", { error: err.message });
    throw err;
  }
}

export async function writeGeneratedData(id, prompt, message) {
  const timestamp = new Date().toISOString();

  const params = {
    TableName: process.env.TABLE_NAME,
    ExpressionAttributeNames: { "#type": "type" },
    Item: { id, type: "output", prompt, message, timestamp },
    ConditionExpression:
      "attribute_not_exists(id) AND attribute_not_exists(#type)",
  };

  try {
    await docClient.send(new PutCommand(params));
  } catch (err) {
    logger.error("Error writing generated data", { error: err.message });
    throw err;
  }
}
