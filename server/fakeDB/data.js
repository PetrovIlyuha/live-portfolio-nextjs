const mongoose = require("mongoose");

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();
const user3Id = mongoose.Types.ObjectId();
const data = {
  users: [
    {
      _id: user1Id,
      avatar:
        "https://images.generated.photos/dImmzScqAalv7N_B66mbEy6_KndIhKMwIpUWYP0CKFc/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA4NDYwOTAuanBn.jpg",
      email: "dnamix1@gmail.com",
      name: "Ilya Petrov",
      username: "poweruser",
      info: "Web-Developer from Moscow",
      password: "superuser",
      role: "admin",
    },
    {
      _id: user2Id,
      avatar:
        "https://images.generated.photos/YSEY4NauMv8uQbbER1zXKftrxm_2NwhWkNrrkg9AMCU/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxMjk2NjcuanBn.jpg",
      email: "horge@gmail.com",
      name: "Horhe Gomez",
      username: "magicsteps",
      info: "Web-Designer from Columbia",
      password: "gomez123",
      role: "guest",
    },
    {
      _id: user3Id,
      avatar:
        "https://images.generated.photos/gRfW1sGEJTFDMU_Cn7ytjjyTIZX-peCmBuTsf2EZzw4/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAwMTc3MTIuanBn.jpg",
      email: "veroclue@gmail.com",
      name: "Veronica Cluevert",
      username: "VeroClue",
      info: "CTO of SaaS startup",
      password: "veronica123",
      role: "guest",
    },
  ],
  projects: [
    {
      title: "Instagram Clone with React",
      content:
        "Material UI and React with GraphQL based API clone of an Instagram App",
      stack: "GraphQL, ReactJS, MaterialUI",
      link: "https://instaclone-theta.now.sh/",
      demoGif: "/insta_demo.gif",
      daysInMaking: 34,
      startDate: "2020-02-10T23:59Z",
      endDate: "2020-02-29T23:59Z",
      isInProgress: true,
      user: user1Id,
    },
    {
      title: "TeaHouse E-commerce SPA",
      content:
        "ReactJS front-end, Contentful as a headless CMS E-commerce App with Shopping Cart, Checkout pipeline sustained with data management in Context from React",
      stack: "ReactJS, Contentful, React Context API as State manager",
      link: "https://zenteahouse.netlify.app/",
      demoGif: "/teahouse_demo.gif",
      daysInMaking: 24,
      startDate: "2020-04-03T23:59Z",
      endDate: "2020-06-05T23:59Z",
      isInProgress: false,
      user: user1Id,
    },
  ],
};

module.exports = data;
