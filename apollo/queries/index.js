import { gql } from 'apollo-boost';

export const GET_PROJECT_BY_ID = gql`
  query Project($id: ID) {
    project(id: $id) {
      _id
      title
      content
      stack
      daysInMaking
      developmentTime @client
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

export const GET_USER_PROJECTS = gql`
  query UserProjects {
    userProjects {
      _id
      title
      content
      stack
      startDate
      endDate
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $title: String
    $content: String
    $stack: String
    $link: String
    $demoGif: String
    $daysInMaking: String
    $startDate: String
    $endDate: String
    $isInProgress: Boolean
  ) {
    createProject(
      input: {
        title: $title
        content: $content
        stack: $stack
        link: $link
        demoGif: $demoGif
        daysInMaking: $daysInMaking
        startDate: $startDate
        endDate: $endDate
        isInProgress: $isInProgress
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

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID
    $title: String
    $content: String
    $stack: String
    $link: String
    $demoGif: String
    $daysInMaking: String
    $startDate: String
    $endDate: String
    $isInProgress: Boolean
  ) {
    updateProject(
      id: $id
      input: {
        title: $title
        content: $content
        stack: $stack
        link: $link
        demoGif: $demoGif
        daysInMaking: $daysInMaking
        startDate: $startDate
        endDate: $endDate
        isInProgress: $isInProgress
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
