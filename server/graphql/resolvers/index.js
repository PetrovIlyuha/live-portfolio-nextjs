const data = {
  projects: [
    {
      _id: "123jdfk123",
      title: "Instagram Clone with React",
      content:
        "Material UI and React with GraphQL based API clone of an Instagram App",
      stack: "GraphQL, ReactJS, MaterialUI",
      link: "https://instaclone-theta.now.sh/",
      demoGif: "/insta_demo.gif",
      daysInMaking: 34,
      startDate: "03/02/2020",
      endDate: "28/02/2020",
      isInProgress: true,
    },
    {
      _id: "qewjdkf3q22",
      title: "TeaHouse E-commerce SPA",
      content:
        "ReactJS front-end, Contentful as a headless CMS E-commerce App with Shopping Cart, Checkout pipeline sustained with data management in Context from React",
      stack: "ReactJS, Contentful, React Context API as State manager",
      link: "https://zenteahouse.netlify.app/",
      demoGif: "/teahouse_demo.gif",
      daysInMaking: 24,
      startDate: "28/04/2020",
      endDate: "28/05/2020",
      isInProgress: false,
    },
  ],
};

exports.projectQueries = {
  project: (root, { id }) => {
    const project = data.projects.find((p) => p._id === id);
    return project;
  },
  projects: () => {
    return data.projects;
  },
};

exports.projectMutations = {
  createProject: (root, { input }) => {
    const _id = require("crypto").randomBytes(10).toString("hex");
    const newProject = { ...input };
    newProject._id = _id;
    data.projects.push(newProject);
    return newProject;
  },
  updateProject: (root, { id, input }) => {
    const index = data.projects.findIndex((p) => p._id === id);
    const projectBeforeUpdating = data.projects[index];
    const updatedProject = { ...projectBeforeUpdating, ...input };
    data.projects[index] = updatedProject;
    return updatedProject;
  },
  deleteProject: (root, { id }) => {
    data.projects.filter((p) => p._id !== id);
    return id;
  },
};
