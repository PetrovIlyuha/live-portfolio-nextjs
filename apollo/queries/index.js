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

// Forum QUERIES START ------------
export const FORUM_CATEGORIES = gql`
  query ForumCategories {
    forumCategories {
      slug
      title
      subTitle
    }
  }
`;

const topicResponseFields = `
  _id
  slug
  title
  content
  user {
    username
    avatar
  }
  forumCategory {
    _id
    title
    slug
  }
`;

export const TOPICS_BY_CATEGORY = gql`
  query TopicsByCategoty($category: String) {
    topicsByCategory(category: $category) {
      ${topicResponseFields}
    }
  }
`;

export const CREATE_TOPIC = gql`
  mutation CreateTopic(
    $title: String
    $content: String
    $forumCategory: String
  ) {
    createTopic(
      input: { title: $title, content: $content, forumCategory: $forumCategory }
    ) {
      ${topicResponseFields}
    }
  }
`;
export const TOPIC_BY_SLUG = gql`
  query TopicBySlug($slug: String) {
    topicBySlug(slug: $slug) {
     ${topicResponseFields}
    }
  }
`;

const postsResponse = `
  _id
  content
  slug
  createdAt
  user {
    username
    avatar
  }
  parent {
    _id
    content
    user {
      username
      avatar
    }
  }
`;

export const POSTS_BY_TOPIC = gql`
  query PostsByTopic($slug: String, $pageNum: Int, $pageSize: Int) {
    postsByTopic(slug: $slug, pageNum: $pageNum, pageSize: $pageSize) {
      posts {
        ${postsResponse}
      }
      count
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($content: String, $topic: String, $parent: String) {
    createPost(input: { content: $content, topic: $topic, parent: $parent }) {
      ${postsResponse}
    }
  }
`;

// Forum QUERIES END -----------
