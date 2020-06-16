import React from "react";
import LoginForm from "../components/forms/LoginForm";
import withApollo from "@/hoc/withApollo";
import { useSignIn } from "@/apollo/actions";
import Redirect from "../components/shared/Redirect";

const Login = () => {
  const [signIn, { data, loading, error }] = useSignIn();
  const errorMessage = (error) => {
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      "Something went wrong!"
    );
  };
  return (
    <>
      <div className="container">
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4 text-center">
              <h1>🖖 You're welcome to Login</h1>
            </div>
          </div>
        </section>
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5 mx-auto">
              <h1 className="page-title">Login</h1>
              <LoginForm
                loading={loading}
                onSubmit={(signInData) => signIn({ variables: signInData })}
              />
              {data && data.signIn && <Redirect toPage="/" />}
              {error && (
                <div className="alert alert-danger">{errorMessage(error)}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withApollo(Login);
