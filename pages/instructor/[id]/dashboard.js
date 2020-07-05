import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import { useRouter } from 'next/router';
import BaseLayout from '../../../layouts/BaseLayout';
import { Card, Button } from 'react-bootstrap';
import { getDataFromTree } from '@apollo/react-ssr';
import { useGetUserProjects, useDeleteProject } from '@/apollo/actions';
import { formatDate } from '../../../utils/functions';
import Link from 'next/link';

const InstructorDashboard = withAuth(
  () => {
    const router = useRouter();
    const { data } = useGetUserProjects();
    const [deleteProject] = useDeleteProject();
    const userProjects = (data && data.userProjects) || [];
    return (
      <BaseLayout>
        <div className="container h-100">
          <div className="bwm-form mt-5">
            <div className="row">
              <div className="col-md-12">
                <h1 className="page-title">Instructor's Projects</h1>
                {userProjects.map((project, index) => (
                  <Card className="mt-5" key={index}>
                    <Card.Header>{project.title}</Card.Header>
                    <Card.Body>
                      <Card.Title>{project.title}</Card.Title>
                      <Card.Text>{project.stack}</Card.Text>
                      <Card.Text>
                        {formatDate(project.startDate)} -{' '}
                        {(project.endDate && formatDate(project.endDate)) || (
                          <b>Still in progress</b>
                        )}
                      </Card.Text>
                      <Link
                        href="/projects/[id]/edit"
                        as={`/projects/${project._id}/edit`}
                      >
                        <a className="btn btn-warning mr-3">Update</a>
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() =>
                          deleteProject({ variables: { id: project._id } })
                        }
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  },
  ['admin', 'instructor'],
  { ssr: true }
);

export default withApollo(InstructorDashboard, { getDataFromTree });
