import { logger } from "#core/runtime_logs.js";
import { createPrompt } from "#utils/prompt.js";
import { writeData } from "#core/dynamo_client.js";
import { invokeModel } from "#core/bedrock_client.js";

export const textController = {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */

  async writeMessage(req, res) {
    logger.info("Write message request data", { data: req.body });

    var message = "";
    const prompt = createPrompt(req.body);

    for (var i = 0; i < 3; i++) {
      const response = await invokeModel(prompt);

      const step1 = response.replace(/“/g, "").replace(/”/g, "");
      const step2 = step1.match(/\n\n([^]+?)\n\n/);

      message = step2?.[1]?.replace(/“/g, "").replace(/”/g, "");
      if (message && message.split(" ").length >= 5) break;
    }

    await writeData({ ...req.body, prompt, message });
    return res.send({ message });
  },
};
