import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { serverConfig } from "config";
import { ERROR_MESSAGES } from "constants/errors";
import onError from "libs/middleware/onError";
import onNoMatch from "libs/middleware/onNoMatch";
import withValidation from "libs/middleware/withValidation";
import { forgotPasswordSchema } from "libs/validation/schemas";
import emailService from "services/email.service";
import { getUserByEmail } from "utils/auth";
import { IResponse } from "models/Response";

const validate = withValidation({
  schema: forgotPasswordSchema,
  mode: "body",
});

const handler = nc({ onError, onNoMatch });

handler.post(async (req: NextApiRequest, res: NextApiResponse<IResponse>) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(400).json({ error: ERROR_MESSAGES.EMAIL_NOT_FOUND });
  }

  emailService.sendEmail(email, "Reset password", "reset-password", {
    link: `${serverConfig.external.url}/reset-password/${user.token}`,
  });

  res.status(200).json({ data: "success" });
});

export default validate(handler);
