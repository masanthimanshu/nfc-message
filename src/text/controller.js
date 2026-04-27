import { logger } from "#core/runtime_logs.js";
import { createPrompt } from "#utils/prompt.js";
import { invokeModel } from "#core/bedrock_client.js";

export const textController = {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */

  async writeMessage(req, res) {
    logger.info("Write message request data", { data: req.body });
    const response = await invokeModel(createPrompt(req.body));
    return res.send(response);
  },
};
