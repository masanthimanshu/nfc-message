import crypto from "node:crypto";
import { logger } from "#core/runtime_logs.js";
import { fromIni } from "@aws-sdk/credential-providers";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient({
  region: process.env.CURRENT_AWS_REGION,
  credentials: fromIni({ profile: process.env.AWS_USER_PROFILE }),
});

const docClient = DynamoDBDocumentClient.from(dbClient);

export async function writeData(data) {
  const id = crypto.randomUUID();
  const timestamp = new Date().toISOString();

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: { id, ...data, timestamp },
    ConditionExpression: "attribute_not_exists(id)",
  };

  try {
    await docClient.send(new PutCommand(params));
    return { id };
  } catch (err) {
    logger.error("Error writing data to DynamoDB", { error: err.message });
    throw err;
  }
}
