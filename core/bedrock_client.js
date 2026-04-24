import {
  InvokeModelCommand,
  BedrockRuntimeClient,
} from "@aws-sdk/client-bedrock-runtime";

const llmClient = new BedrockRuntimeClient({
  region: process.env.CURRENT_AWS_REGION,
});

export async function invokeModel(prompt) {
  const command = new InvokeModelCommand({
    modelId: "amazon.nova-lite-v1:0",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      system: [{ text: "You are a helpful assistant." }],
      messages: [
        {
          role: "user",
          content: [{ text: prompt }],
        },
      ],
    }),
  });

  const res = await llmClient.send(command);
  const result = JSON.parse(new TextDecoder().decode(res.body));

  return result;
}
