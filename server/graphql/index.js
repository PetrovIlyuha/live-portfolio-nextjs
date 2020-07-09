const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');

const {
  projectQueries,
  projectMutations,
  userMutations,
  userQueries,
  forumQueries,
  forumMutations,
} = require('./resolvers');
const { projectTypes, userTypes, forumTypes } = require('./types');
const { buildAuthContext } = require('./context');

const Project = require('./models/Project');
const User = require('./models/User');
const ForumCategory = require('./models/ForumCategory');
const Topic = require('./models/Topic');
const Post = require('./models/Post');

exports.createApolloServer = () => {
  const typeDefs = gql`
    ${projectTypes}
    ${userTypes}
    ${forumTypes}

    type Query {
      project(id: ID): Project
      projects: [Project]
      userProjects: [Project]
      user: User
      forumCategories: [ForumCategory]
      topicsByCategory(category: String): [Topic]
      topicBySlug(slug: String): Topic
      postsByTopic(slug: String): [Post]
    }

    type Mutation {
      createProject(input: ProjectInput): Project
      updateProject(id: ID, input: ProjectInput): Project
      deleteProject(id: ID): ID

      createTopic(input: TopicInput): Topic

      signUp(input: SignUpInput): String
      signIn(input: SignInInput): User
      signOut: Boolean
    }
  `;

  // resolvers
  const resolvers = {
    Query: { ...projectQueries, ...userQueries, ...forumQueries },
    Mutation: { ...projectMutations, ...userMutations, ...forumMutations },
  };
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      ...buildAuthContext(req),
      models: {
        Project: new Project(mongoose.model('Project'), req.user),
        User: new User(mongoose.model('User')),
        ForumCategory: new ForumCategory(mongoose.model('ForumCategory')),
        Topic: new Topic(mongoose.model('Topic'), req.user),
        Post: new Post(mongoose.model('Post', req.user)),
      },
    }),
  });
  return apolloServer;
};
