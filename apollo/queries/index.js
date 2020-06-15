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
        startDate: "2020-03-10T23:59Z"
        endDate: "2020-04-10T23:59Z"
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

export const UPDATE_PORTFOLIO = gql`
  mutation UpdateProject($id: ID) {
    updateProject(
      id: $id
      input: {
        title: "Instagram Clone with React"
        content: "Material UI and React with GraphQL based API clone of an Instagram App"
        stack: "GraphQL, ReactJS, MaterialUI"
        link: "https://instaclone-theta.now.sh/"
        demoGif: "/insta_demo.gif"
        daysInMaking: 34
        startDate: "2020-04-03T23:59Z"
        endDate: "2020-06-05T23:59Z"
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

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID) {
    deleteProject(id: $id)
  }
`;

// Auth queries
export const SIGN_UP = gql`
  mutation SignUp(
    $avatar: String
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUp(
      input: {
        avatar: $avatar
        username: $username
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    )
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      _id
      username
      role
      avatar
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export const GET_USER = gql`
  query User {
    user {
      _id
      username
      avatar
      role
    }
  }
`;
