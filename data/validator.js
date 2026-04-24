import { z } from "zod";
import { logger } from "#core/runtime_logs.js";

const messageInputSchema = z.object({
  battery: z.string(),
  address: z.string(),
  latitude: z.string(),
  longitude: z.string(),
});

/**
 * @param {import("zod").ZodObject} schema
 */

const validateData = (schema) => (req, res, next) => {
  try {
    schema.strict().parse(req.body);
    next();
  } catch (error) {
    logger.error("Data validation failed", { error: error.message });
    res.status(400).send({ error: "Missing required fields" });
  }
};

export const validateMessageInput = validateData(messageInputSchema);
