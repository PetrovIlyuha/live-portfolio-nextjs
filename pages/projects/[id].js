import React from "react";
import axios from "axios";

const fetchProjectById = (id) => {
  const query = `
    query Project($id: ID) {
      project(id: $id) {
        _id
        title
        content
        stack
        daysInMaking
        isInProgress
        startDate
        endDate
        demoGif
        link
      }
    }
  `;
  const variables = { id: id };
  return axios
    .post("http://localhost:3000/graphql", {
      query: query,
      variables: variables,
    })
    .then(
      ({
        data: {
          data: { project },
        },
      }) => {
        // console.log(project);
        return project;
      }
    );
};

const ProjectsDetail = ({ project }) => {
  return (
    <div className="portfolio-detail">
      <div className="container">
        <div className="jumbotron bg-dark">
          <h1 className="display-5 text-white mb-5">{project.title}</h1>
          <img
            src={project.demoGif}
            alt="Project Demo"
            className="w-75 rounded"
          />
          <h4 className="text-white my-4">{project.stack}</h4>
          <p>
            <a
              className="btn btn-lg btn-danger"
              href={project.link}
              role="button"
            >
              Full Project
            </a>
          </p>
        </div>

        <div className="row marketing">
          <div className="col-lg-6">
            <h4 className="title">Technologies</h4>
            <p className="text">{project.stack}</p>

            <h4 className="title">Start Date</h4>
            <p className="text">{project.startDate}</p>
          </div>

          <div className="col-lg-6">
            <h4 className="title">Coding Time</h4>
            <p className="text">{project.daysInMaking} days</p>

            <h4 className="title">End Date</h4>
            <p className="text">{project.endDate || "Present"}</p>
          </div>
          <div className="col-md-12">
            <hr />
            <h4 className="title">Description</h4>
            <p>{project.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectsDetail.getInitialProps = async ({ query }) => {
  const project = await fetchProjectById(query.id);
  return { project };
};

export default ProjectsDetail;
