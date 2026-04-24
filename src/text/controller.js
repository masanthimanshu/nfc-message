import { logger } from "#core/runtime_logs.js";

export const textController = {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */

  async writeMessage(req, res) {
    logger.info("Received write message request", { data: req.body });

    return res.send({
      message: "Write message endpoint is under construction",
    });
  },
};
