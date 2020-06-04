import { gql } from "apollo-boost";

export const GET_PROJECT_BY_ID = gql`
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

export const GET_PROJECTS = gql`
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
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject {
    createProject(
      input: {
        title: "Instagram Clone with React"
        content: "Material UI and React with GraphQL based API clone of an Instagram App"
        stack: "GraphQL, ReactJS, MaterialUI"
        link: "https://instaclone-theta.now.sh/"
        demoGif: "/insta_demo.gif"
        daysInMaking: 34
        startDate: "03/02/2020"
        endDate: "28/02/2020"
        isInProgress: true
      }
    ) {
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
  }
`;
