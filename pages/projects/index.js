import React from 'react';
import { useGetProjects } from '../../apollo/actions';
import BaseLayout from '../../layouts/BaseLayout';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import Link from 'next/link';
import ProjectCard from '../../components/projects/ProjectCard';
import SpinnerLoader from '../../components/shared/Loader';

const Projects = () => {
  const { data, loading } = useGetProjects();
  const projects = (data && data.projects) || [];

  if (loading) return <SpinnerLoader />;

  return (
    <BaseLayout footer="relative">
      <div className="projects_page projects_image_bg px-4">
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4 text-center text-white">
              <h1>Projects</h1>
            </div>
          </div>
        </section>
        <section className="pb-5">
          <div className="container">
            <div className="row">
              {projects.map(project => (
                <div key={project._id} className="col-md-4 mb-5">
                  <Link href="/projects/[id]" as={`/projects/${project._id}`}>
                    <a className="card-link">
                      <ProjectCard project={project} />
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Projects, { getDataFromTree });
