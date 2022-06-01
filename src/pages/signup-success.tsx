import Layout from "components/common/Layout";

export default function SignUpSuccess() {
  return (
    <Layout>
      <section className="relative text-gray-600 body-font">
        <div className="container flex flex-col justify-center px-5 py-24 mx-auto">
          <div className="relative z-10 flex flex-col w-1/3 p-8 mx-auto mt-10 bg-white rounded-lg shadow-md">
            <div className="mb-1 text-lg font-medium text-gray-900 title-font">
              <h3>Thank You For Signing Up</h3>
              <h3>Please Confirm Your Email!</h3>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
