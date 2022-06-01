import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { ERROR_MESSAGES } from "constants/errors";
import onError from "libs/middleware/onError";
import onNoMatch from "libs/middleware/onNoMatch";
import withValidation from "libs/middleware/withValidation";
import { resetPasswordWithTokenSchema } from "libs/validation/schemas";
import {
  checkExistingToken,
  hashPassword,
  updatePassword,
} from "utils/auth";
import { IResponse } from "models/Response";

const validate = withValidation({
  schema: resetPasswordWithTokenSchema,
  mode: "body",
});

const handler = nc({ onError, onNoMatch });

handler.post(async (req: NextApiRequest, res: NextApiResponse<IResponse>) => {
  const { token, password } = req.body;
  const isExistingToken = await checkExistingToken(token);

  if (!isExistingToken) {
    return res.status(400).json({ error: ERROR_MESSAGES.INVALID_TOKEN });
  }

  const hashedPassword = await hashPassword(password);
  await updatePassword(token, hashedPassword);

  res.status(200).json({ data: "success" });
});

export default validate(handler);
