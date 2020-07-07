import withApollo from '@/hoc/withApollo';
import ProjectNewForm from '@/components/forms/ProjectNewForm';
import withAuth from '@/hoc/withAuth';
import BaseLayout from '@/layouts/BaseLayout';
import { useGetProject, useUpdateProject } from '@/apollo/actions';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const EditProject = () => {
  const router = useRouter();
  const { id } = router.query;
  const [updateProject, { error }] = useUpdateProject();
  const { data } = useGetProject({
    variables: { id: id },
  });

  const errorMessage = error => {
    toast.error('All fields should be filled.', {
      autoClose: 3500,
      hideProgressBar: true,
    });
  };

  const handleProjectUpdate = async data => {
    await updateProject({ variables: { id, ...data } });
    toast.success('Project has been updated!', {
      autoClose: 2000,
      hideProgressBar: true,
    });
  };
  return (
    <BaseLayout>
      <div className="container">
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4 text-center">
              <h1>Update Your Project Details</h1>
            </div>
          </div>
        </section>
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5 mx-auto">
              <h1 className="page-title">Project</h1>
              {data && (
                <ProjectNewForm
                  status="Update"
                  onSubmit={handleProjectUpdate}
                  initialData={data.project}
                />
              )}
              {error && errorMessage(error)}
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(withAuth(EditProject, ['admin', 'instructor']));
