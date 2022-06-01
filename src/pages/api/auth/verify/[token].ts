import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import onError from "libs/middleware/onError";
import onNoMatch from "libs/middleware/onNoMatch";
import { checkExistingToken, markAccountAsVerified } from "utils/auth";
import { IResponse } from "models/Response";
import { ERROR_MESSAGES } from "constants/errors";
import { MESSAGES } from "constants/messages";

const handler = nc({ onError, onNoMatch });

handler.get(async (req: NextApiRequest, res: NextApiResponse<IResponse>) => {
  const token = req.query.token as string;
  const isExistingToken = await checkExistingToken(token);

  if (isExistingToken) {
    await markAccountAsVerified(token);
    res.status(200).json({ data: MESSAGES.ACCOUNT_VERIFIED });
  } else {
    res.status(400).json({ error: ERROR_MESSAGES.INVALID_TOKEN });
  }
});

export default handler;
