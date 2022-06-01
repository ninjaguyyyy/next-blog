import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Error from "components/common/Error";
import Layout from "components/common/Layout";
import { verifyToken } from "services/api-client/user.service";

export default function VerifyToken() {
  const [errMsg, setErrMsg] = useState<string>();
  const [verificationResult, setVerificationResult] = useState<string>();

  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      processVerifyToken(token as string);
    }
  }, [token]);

  const processVerifyToken = async (token: string) => {
    setErrMsg("");
    try {
      const result = await verifyToken(token);
      setVerificationResult(result);
    } catch (err) {
      const message = err.response?.data?.error || err.message;
      setErrMsg(message);
    }
  };

  return (
    <Layout>
      <section className="relative text-gray-600 body-font">
        <div className="container flex flex-col justify-center px-5 py-24 mx-auto">
          <div className="relative z-10 flex flex-col w-2/3 p-8 mx-auto mt-10 bg-white rounded-lg shadow-md">
            <h2 className="mb-1 text-lg font-medium text-gray-900 title-font">
              Verify account
            </h2>

            {verificationResult && (
              <div>{verificationResult}</div>
            )}

            {/*Error*/}
            <Error message={errMsg}/>
          </div>
        </div>
      </section>
    </Layout>
  );
}
