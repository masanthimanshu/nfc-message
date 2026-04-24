import { fromIni } from "@aws-sdk/credential-providers";
import {
  InvokeModelCommand,
  BedrockRuntimeClient,
} from "@aws-sdk/client-bedrock-runtime";

const llmClient = new BedrockRuntimeClient({
  region: process.env.CURRENT_AWS_REGION,
  credentials: fromIni({ profile: process.env.AWS_USER_PROFILE }),
});

export async function invokeModel(prompt) {
  const command = new InvokeModelCommand({
    modelId: "google.gemma-3-4b-it",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }],
      system_instruction: { text: "You are a helpful assistant." },
    }),
  });

  const res = await llmClient.send(command);
  const result = JSON.parse(new TextDecoder().decode(res.body));

  return result.choices[0].message.content;
}
