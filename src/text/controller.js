import { logger } from "#core/runtime_logs.js";
import { createPrompt } from "#utils/prompt.js";
import { invokeModel } from "#core/bedrock_client.js";
import { writeInputData, writeGeneratedData } from "#core/dynamo_client.js";

export const textController = {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */

  async writeMessage(req, res) {
    logger.info("Write message request data", { data: req.body });

    const prompt = createPrompt(req.body);
    const message = await invokeModel(prompt);

    const { id } = await writeInputData(req.body);
    await writeGeneratedData(id, prompt, message);

    return res.send({ message });
  },
};
