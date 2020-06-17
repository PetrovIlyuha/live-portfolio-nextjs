import withApollo from "@/hoc/withApollo";
import withAuth from "../hoc/withAuth";

const Secret = withAuth(() => {
  return (
    <>
      <div className="container">
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4 text-center">
              <h1>🔐 Secret Page</h1>
              <p>Only Authorized Personnel Allowed ⚡</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}, ["instructor"]);

export default withApollo(Secret);
