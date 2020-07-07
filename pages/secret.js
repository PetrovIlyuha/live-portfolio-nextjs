import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import BaseLayout from '@/layouts/BaseLayout';

const Secret = withAuth(() => {
  return (
    <BaseLayout>
      <div className="container" style={{ marginTop: '45vh' }}>
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4 text-center">
              <h1>🔐 Secret Page</h1>
              <p>Only Authorized Personnel Allowed ⚡</p>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}, ['instructor', 'admin']);

export default withApollo(Secret);
