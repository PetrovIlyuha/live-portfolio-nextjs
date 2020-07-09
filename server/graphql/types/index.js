const projectFields = `
    title: String
    content: String
    stack: String
    daysInMaking: String
    startDate: String
    endDate: String
    isInProgress: Boolean
    link: String
    demoGif: String
`;

exports.projectTypes = `
  type Project {
    _id: ID
    ${projectFields}
  }

  input ProjectInput {
    ${projectFields}
  }
`;

exports.userTypes = `
  type User {
    _id: ID,
    avatar: String
    username: String
    name: String
    email: String
    role: String
  }

  input SignUpInput {
    avatar: String,
    username: String!
    name: String
    email: String!
    password: String!
    passwordConfirmation: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }
`;

exports.forumTypes = `
  type ForumCategory {
    _id: ID
    title: String
    subTitle: String
    slug: String
  }

  type Author {
    avatar: String
    username: String
  }

  type Topic {
    _id: ID
    slug: String
    title: String
    content: String
    forumCategory: ForumCategory
    user: Author
    createdAt: String
  }

  input TopicInput {
    title: String
    content: String
    forumCategory: String
  }

  type Post {
    _id: ID
    content: String
    slug: String
    fullSlug: String
    topic: Topic
    user: User
    parent: Post
    createdAt: String
  }
`;
