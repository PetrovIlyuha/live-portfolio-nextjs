import LoginForm from '../components/forms/LoginForm';
import withApollo from '@/hoc/withApollo';
import { useSignIn } from '@/apollo/actions';
import { useRouter } from 'next/router';
import Redirect from '../components/shared/Redirect';
import BaseLayout from '../layouts/BaseLayout';
import { toast } from 'react-toastify';
import { messages } from '../variables/messages';

const Login = () => {
  const [signIn, { data, loading, error }] = useSignIn();
  const router = useRouter();
  const { message } = router.query;
  const errorMessage = error => {
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      'Something went wrong!'
    );
  };

  const accessViolation = () => {
    if (message === 'REGISTERED') {
      toast.success(messages[message], {
        hideProgressBar: true,
        autoClose: 4000,
        pauseOnHover: true,
      });
    } else {
      toast.error(messages[message], {
        hideProgressBar: true,
        autoClose: 5000,
        pauseOnHover: true,
      });
    }
  };
  return (
    <BaseLayout>
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
              {message && accessViolation()}
              <LoginForm
                loading={loading}
                onSubmit={signInData => signIn({ variables: signInData })}
              />
              {data && data.signIn && (
                <Redirect toPage="/" query={{ message: 'LOGGED_IN' }} />
              )}
              {error && (
                <div className="alert alert-danger">{errorMessage(error)}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Login);
