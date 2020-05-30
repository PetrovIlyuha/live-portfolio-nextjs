const projectFields = `
    title: String
    content: String
    stack: String
    daysInMaking: Int
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
