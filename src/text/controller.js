export const textController = {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */

  async writeMessage(req, res) {
    return res.send({
      message: "Write message endpoint is under construction",
    });
  },
};
