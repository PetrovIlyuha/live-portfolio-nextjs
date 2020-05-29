import React from "react";
import { Card, Button } from "react-bootstrap";

const ProjectCard = ({ project }) => {
  return (
    <div className="card subtle-shadow no-border">
      <Card.Img variant="top" src={project.demoGif} />
      <Card.Body>
        <Card.Title className="card-title">{project.title}</Card.Title>
        <Card.Text className="card-subtitle mb-2 text-muted">
          {project.stack}
        </Card.Text>
        {/* <Image src={project.demoGif} style={{ width: "200px" }} rounded /> */}
        <p className="card-text fs-2">{project.content.substring(0, 60)}...</p>
        <Button variant="info" className="text-center">
          <a href={project.link} className="text-white">
            See Full Project
          </a>
        </Button>
      </Card.Body>
      <div className="card-footer no-border">
        <small className="text-muted">
          Days in Making: {project.daysInMaking}
        </small>
      </div>
    </div>
  );
};

export default ProjectCard;
