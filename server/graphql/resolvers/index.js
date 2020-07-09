exports.projectQueries = {
  project: (root, { id }, ctx) => {
    return ctx.models.Project.getById(id);
  },
  projects: (root, args, ctx) => {
    return ctx.models.Project.getAll();
  },
  userProjects: (root, args, ctx) => {
    return ctx.models.Project.getAllByUser();
  },
};

exports.projectMutations = {
  createProject: async (root, { input }, ctx) => {
    const createdProject = await ctx.models.Project.create(input);
    return createdProject;
  },
  updateProject: async (root, { id, input }, ctx) => {
    const updatedProject = await ctx.models.Project.findAndUpdate(id, input);
    return updatedProject;
  },
  deleteProject: async (root, { id }, ctx) => {
    const deletedProject = await ctx.models.Project.findAndDelete(id);
    return deletedProject._id;
  },
};

// User queries
exports.userQueries = {
  user: (root, args, ctx) => {
    return ctx.models.User.getAuthUser(ctx);
  },
};

// User Mutations
exports.userMutations = {
  signUp: async (root, { input }, ctx) => {
    const registeredUser = await ctx.models.User.signUp(input);
    return registeredUser._id;
  },
  signIn: async (root, { input }, ctx) => {
    return await ctx.models.User.signIn(input, ctx);
  },
  signOut: (root, args, ctx) => {
    return ctx.models.User.signOut(ctx);
  },
};

// forum
exports.forumQueries = {
  forumCategories: (root, args, ctx) => {
    return ctx.models.ForumCategory.getAll();
  },
  topicsByCategory: async (root, { category }, ctx) => {
    const forumCategory = await ctx.models.ForumCategory.getBySlug(category);
    if (!forumCategory) {
      return null;
    }
    return ctx.models.Topic.getAllByCategory(forumCategory._id);
  },
  topicBySlug: async (root, { slug }, ctx) => {
    return ctx.models.Topic.getBySlug(slug);
  },
  postsByTopic: async (root, { slug }, ctx) => {
    const topic = await ctx.models.Topic.getBySlug(slug);
    return ctx.models.Post.getAllByTopic(topic);
  },
};

exports.forumMutations = {
  createTopic: async (root, { input }, ctx) => {
    const category = await ctx.models.ForumCategory.getBySlug(
      input.forumCategory
    );
    input.forumCategory = category._id;
    const topic = await ctx.models.Topic.create(input);
    return topic;
  },
};
