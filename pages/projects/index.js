import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import axios from "axios";
import { GET_PROJECTS, CREATE_PROJECT } from "../../apollo/queries";
import { Spinner } from "react-bootstrap";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import Link from "next/link";
import ProjectCard from "../../components/projects/ProjectCard";

const deleteProjectMutation = (id) => {
  const query = `
    mutation DeleteProject {
      deleteProject(id: "${id}")
  }`;
  return axios
    .post("http://localhost:3000/graphql", {
      query,
    })
    .then(
      ({
        data: {
          data: { deleteProject },
        },
      }) => {
        return deleteProject;
      }
    );
};

const updateProjectMutation = (id) => {
  const query = `
    mutation UpdateProject {
      updateProject(id: "${id}", input: {
        title: "Instagram Clone with React",
        content:
          "Material UI and React with GraphQL based API clone of an Instagram App",
        stack: "GraphQL, ReactJS, MaterialUI",
        link: "https://instaclone-theta.now.sh/",
        demoGif: "/insta_demo.gif",
        daysInMaking: 34,
        startDate: "03/02/2020",
        endDate: "28/02/2020",
        isInProgress: true,
    }) {
      _id
      title
      content
      stack
      link
      demoGif
      daysInMaking
      startDate
      endDate
      isInProgress
    }
  }`;
  return axios
    .post("http://localhost:3000/graphql", {
      query,
    })
    .then(
      ({
        data: {
          data: { updateProject },
        },
      }) => {
        return updateProject;
      }
    );
};

const Projects = () => {
  const { data, loading, error } = useQuery(GET_PROJECTS);
  const [createProject] = useMutation(CREATE_PROJECT, {
    update(cache, { data: { createProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, createProject] },
      });
    },
  });

  if (loading) return <Spinner animation="grow" variant="danger" size="lg" />;

  const updateProject = async (id) => {
    await updateProjectMutation(id);
  };

  const deleteProject = async (id) => {
    await deleteProjectMutation(id);
  };

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
                onClick={() => updateProject(project._id)}
              >
                Update Project
              </button>
              <button
                className="btn btn-secondary ml-3 mt-5"
                onClick={() => deleteProject(project._id)}
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
