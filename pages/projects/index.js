import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import ProjectCard from "../../components/projects/ProjectCard";

const fetchProjects = () => {
  const query = `
    query Projects {
      projects {
        _id
        title
        content
        stack
        daysInMaking
        isInProgress
        demoGif
        link
      }
  }`;
  return axios
    .post("http://localhost:3000/graphql", {
      query,
    })
    .then(
      ({
        data: {
          data: { projects },
        },
      }) => {
        return projects;
      }
    );
};

const createProjectMutation = () => {
  const query = `
    mutation CreateProject {
      createProject(input: {
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
          data: { createProject },
        },
      }) => {
        return createProject;
      }
    );
};

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

const Projects = ({ data }) => {
  const [projects, setProjects] = useState(data.projects);
  const createProject = async () => {
    const newProject = await createProjectMutation();
    const newProjects = [...projects, newProject];
    setProjects(newProjects);
  };

  const updateProject = async (id) => {
    const updatedProject = await updateProjectMutation(id);
    const index = projects.findIndex((p) => p._id === id);
    const newProjects = [...projects];
    newProjects[index] = updatedProject;
    setProjects(newProjects);
  };

  const deleteProject = async (id) => {
    const deletedId = await deleteProjectMutation(id);
    const index = projects.findIndex((p) => p._id === deletedId);
    const newProjects = [...projects];
    newProjects.splice(deletedId, 1);
    setProjects(newProjects);
  };
  return (
    <>
      <section className="section-title">
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

Projects.getInitialProps = async () => {
  const projects = await fetchProjects();
  return { data: { projects } };
};

export default Projects;
