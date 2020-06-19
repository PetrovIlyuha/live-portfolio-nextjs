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
