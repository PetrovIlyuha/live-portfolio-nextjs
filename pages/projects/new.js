import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import { useCreateProject } from '@/apollo/actions';
import { useRouter } from 'next/router';
import ProjectNewForm from '../../components/forms/ProjectNewForm';
import BaseLayout from '../../layouts/BaseLayout';
import { toast } from 'react-toastify';

const ProjectNew = () => {
  const [createProject, { error, loading, data }] = useCreateProject();
  const router = useRouter();

  const errorMessage = error => {
    return (
      (error.graphQLErrors && error.graphQLErrors[0]?.message) ||
      'Something went wrong!'
    );
  };

  const notifyOnCreateSuccess = () => {
    toast.success('Project was created!', {
      hideProgressBar: true,
      autoClose: 3000,
    });
  };

  const handleCreateProject = async data => {
    await createProject({ variables: data });
    notifyOnCreateSuccess();
    router.push('/projects');
  };
  return (
    <BaseLayout>
      <div className="container">
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4 text-center">
              <h1>🔥Create new project to market your skills</h1>
            </div>
          </div>
        </section>
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5 mx-auto">
              <h1 className="page-title">Project</h1>
              <ProjectNewForm onSubmit={handleCreateProject} />
              {error && (
                <div className="alert alert-danger">{errorMessage(error)}</div>
              )}
              {!loading && data && notifyOnCreateSuccess()}
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(withAuth(ProjectNew, ['admin', 'instructor']));
