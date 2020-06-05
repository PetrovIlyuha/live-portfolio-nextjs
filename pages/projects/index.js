import React from "react";
import {
  useCreateProject,
  useDeleteProject,
  useGetProjects,
  useUpdateProject,
} from "../../apollo/actions";

import { Spinner } from "react-bootstrap";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import Link from "next/link";
import ProjectCard from "../../components/projects/ProjectCard";

const Projects = () => {
  const { data, loading } = useGetProjects();
  const [createProject] = useCreateProject();
  const [deleteProject] = useDeleteProject();
  const [updateProject] = useUpdateProject();

  if (loading)
    return (
      <Spinner
        animation="grow"
        variant="danger"
        size="lg"
        style={{ marginTop: 100 }}
      />
    );

  const projects = (data && data.projects) || [];

  return (
    <>
      <section className="section-title projects_page">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Projects</h1>
          </div>
        </div>
        <button className="btn btn-secondary" onClick={createProject}>
          Create New Project
        </button>
      </section>
      <section className="pb-5">
        <div className="row">
          {projects.map((project) => (
            <div key={project._id} className="col-md-4 mb-5">
              <Link href="/projects/[id]" as={`/projects/${project._id}`}>
                <a className="card-link">
                  <ProjectCard project={project} />
                </a>
              </Link>
              <button
                className="btn btn-secondary mt-5"
                onClick={() =>
                  updateProject({ variables: { id: project._id } })
                }
              >
                Update Project
              </button>
              <button
                className="btn btn-secondary ml-3 mt-5"
                onClick={() =>
                  deleteProject({ variables: { id: project._id } })
                }
              >
                Delete Project
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default withApollo(Projects, { getDataFromTree });
