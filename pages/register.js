import RegisterForm from '@/components/forms/RegisterForm';
import { Mutation } from 'react-apollo';
import { SIGN_UP } from '@/apollo/queries';
import withApollo from '@/hoc/withApollo';
import Redirect from './../components/shared/Redirect';
import BaseLayout from '../layouts/BaseLayout';

const Register = () => {
  const errorMessage = error => {
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      'Something went wrong!'
    );
  };
  return (
    <BaseLayout>
      <div className="container mt-5">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5 mx-auto">
              <h1 className="page-title">Register</h1>
              <Mutation mutation={SIGN_UP}>
                {(signUpUser, { data, error }) => (
                  <>
                    <RegisterForm
                      onSubmit={registerData => {
                        signUpUser({ variables: registerData });
                      }}
                    />
                    {data && data.signUp && (
                      <Redirect
                        toPage="/login"
                        query={{ message: 'REGISTERED' }}
                      />
                    )}
                    {error && (
                      <div className="alert alert-danger">
                        {errorMessage(error)}
                      </div>
                    )}
                  </>
                )}
              </Mutation>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Register);
