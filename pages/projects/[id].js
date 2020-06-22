import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_PROJECT_BY_ID } from "../../apollo/queries";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import { Spinner } from "react-bootstrap";
import BaseLayout from "../../layouts/BaseLayout";

const ProjectsDetail = ({ query }) => {
  const { data, loading, error } = useQuery(GET_PROJECT_BY_ID, {
    variables: { id: query.id },
  });
  const project = (data && data.project) || {};

  if (loading) return <Spinner animation="grow" variant="danger" size="lg" />;
  return (
    <BaseLayout>
      <div className="portfolio-detail">
        <div className="container mt-4">
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
    </BaseLayout>
  );
};

ProjectsDetail.getInitialProps = async ({ query }) => {
  return { query };
};

export default withApollo(ProjectsDetail, { getDataFromTree });
