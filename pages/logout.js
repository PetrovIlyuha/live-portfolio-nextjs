import withApollo from '@/hoc/withApollo';
import { useRouter } from 'next/router';
import { useSignOut } from '@/apollo/actions';
import { useEffect } from 'react';
import BaseLayout from '@/layouts/BaseLayout';
import { toast } from 'react-toastify';
import SpinnerLoader from '../components/shared/Loader';

const Logout = ({ apollo }) => {
  const router = useRouter();
  const [signOut] = useSignOut();
  useEffect(() => {
    const displayFarewell = () => {
      toast.success('Oh...OK! See you next time!', {
        hideProgressBar: true,
        autoClose: 6000,
      });
    };
    displayFarewell();
  }, []);

  useEffect(() => {
    signOut().then(() => {
      apollo.resetStore().then(() => {
        router.push('/');
      });
    });
  }, []);
  return (
    <BaseLayout>
      <div className="container">
        <div className="bwm-form mt-5">
          <div className="row">
            <div className="col-md-5 mx-auto">
              <h1 className="page-title text-center">Logout</h1>
              <div className="text-center">
                <SpinnerLoader />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Logout);
