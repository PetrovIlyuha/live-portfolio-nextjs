import withApollo from "@/hoc/withApollo";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSignOut } from "../apollo/actions";
import { useEffect } from "react";

const Logout = ({ apollo }) => {
  const [signOut] = useSignOut();
  const router = useRouter();

  useEffect(() => {
    signOut().then(() => {
      apollo.resetStore().then(() => {
        router.push("/login");
      });
    });
  }, []);
  return (
    <>
      <div className="container">
        <div className="bwm-form mt-5">
          <div className="row">
            <div className="col-md-5 mx-auto">
              <h1 className="page-title text-center">Logout</h1>
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withApollo(Logout);