import { fromIni } from "@aws-sdk/credential-providers";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const ssmClient = new SSMClient({
  region: process.env.CURRENT_AWS_REGION,
  credentials: fromIni({ profile: process.env.AWS_USER_PROFILE }),
});

export async function getParameterValue(name) {
  const res = await ssmClient.send(new GetParameterCommand({ Name: name }));
  return res.Parameter.Value;
}
