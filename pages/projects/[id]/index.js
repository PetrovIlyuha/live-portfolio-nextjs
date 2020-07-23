import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import { Spinner } from 'react-bootstrap';
import BaseLayout from '@/layouts/BaseLayout';
import { useGetProject } from '../../../apollo/actions';
import { formatDate } from '../../../utils/functions';

const ProjectsDetail = ({ query }) => {
  const { data, loading, error } = useGetProject({
    variables: { id: query.id },
  });
  const project = (data && data.project) || {};
  if (loading) return <Spinner animation="grow" variant="danger" size="lg" />;
  return (
    <BaseLayout>
      <div className="portfolio-detail">
        <div className="container mt-5">
          <div className="jumbotron bg-gradient-primary">
            <h1 className="display-5 mb-5">{project.title}</h1>
            <img
              src={project.demoGif}
              alt="Project Demo"
              className="w-75 rounded"
            />
            <h4 className="my-4">{project.stack}</h4>
            <p>
              <a
                className="btn btn-lg btn-danger"
                href={project.link}
                role="button"
              >
                Live Demo
              </a>
            </p>
          </div>

          <div className="row marketing">
            <div className="col-lg-6">
              <h4 className="title">Tech in use</h4>
              <p className="text">{project.stack}</p>

              <h4 className="title">Started on</h4>
              <p className="text">{formatDate(project.startDate)}</p>
            </div>

            <div className="col-lg-6">
              <h4 className="title">Development Time</h4>
              <p className="text">{project.developmentTime} days</p>

              <h4 className="title">Finished on</h4>
              <p className="text">
                {(project.endDate && formatDate(project.endDate)) || (
                  <b>Still in Development</b>
                )}
              </p>
            </div>
            <div className="col-md-12">
              <hr />
              <h4 className="title">Description</h4>
              <p>{project.content}</p>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

ProjectsDetail.getInitialProps = async ({ query }) => {
  return { query };
};

export default withApollo(ProjectsDetail, { getDataFromTree });
