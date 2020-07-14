const mongoose = require('mongoose');
const moment = require('moment');

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();
const user3Id = mongoose.Types.ObjectId();
const forum1Id = mongoose.Types.ObjectId();
const forum2Id = mongoose.Types.ObjectId();
const forum3Id = mongoose.Types.ObjectId();
const topic1Id = mongoose.Types.ObjectId();
const topic2Id = mongoose.Types.ObjectId();
const topic3Id = mongoose.Types.ObjectId();

const post1Id = mongoose.Types.ObjectId();
const post1CreatedAt = moment().subtract(7, 'days');

const post2Id = mongoose.Types.ObjectId();
const post2CreatedAt = moment(post1CreatedAt).add(1, 'days');

const post3Id = mongoose.Types.ObjectId();
const post3CreatedAt = moment(post2CreatedAt).add(1, 'days');

const post4Id = mongoose.Types.ObjectId();
const post4CreatedAt = moment(post3CreatedAt).add(1, 'days');

const data = {
  users: [
    {
      _id: user1Id,
      avatar:
        'https://images.generated.photos/dImmzScqAalv7N_B66mbEy6_KndIhKMwIpUWYP0CKFc/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA4NDYwOTAuanBn.jpg',
      email: 'dnamix1@gmail.com',
      name: 'Ilya Petrov',
      username: 'poweruser',
      info: 'Web-Developer from Moscow',
      password: 'superuser',
      role: 'instructor',
    },
    {
      _id: user2Id,
      avatar:
        'https://images.generated.photos/YSEY4NauMv8uQbbER1zXKftrxm_2NwhWkNrrkg9AMCU/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxMjk2NjcuanBn.jpg',
      email: 'horge@gmail.com',
      name: 'Horhe Gomez',
      username: 'magicsteps',
      info: 'Web-Designer from Columbia',
      password: 'gomez123',
      role: 'guest',
    },
    {
      _id: user3Id,
      avatar:
        'https://images.generated.photos/gRfW1sGEJTFDMU_Cn7ytjjyTIZX-peCmBuTsf2EZzw4/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAwMTc3MTIuanBn.jpg',
      email: 'veroclue@gmail.com',
      name: 'Veronica Cluevert',
      username: 'VeroClue',
      info: 'CTO of SaaS startup',
      password: 'veronica123',
      role: 'guest',
    },
  ],
  projects: [
    {
      title: 'Instagram Clone with React',
      content:
        'Material UI and React with GraphQL based API clone of an Instagram App',
      stack: 'GraphQL, ReactJS, MaterialUI',
      link: 'https://instaclone-theta.now.sh/',
      demoGif: '/insta_demo.gif',
      daysInMaking: 34,
      startDate: '2020-02-10T23:59Z',
      endDate: '2020-02-29T23:59Z',
      isInProgress: true,
      user: user1Id,
    },
    {
      title: 'TeaHouse E-commerce SPA',
      content:
        'ReactJS front-end, Contentful as a headless CMS E-commerce App with Shopping Cart, Checkout pipeline sustained with data management in Context from React',
      stack: 'ReactJS, Contentful, React Context API as State manager',
      link: 'https://zenteahouse.netlify.app/',
      demoGif: '/teahouse_demo.gif',
      daysInMaking: 24,
      startDate: '2020-04-03T23:59Z',
      endDate: '2020-06-05T23:59Z',
      isInProgress: false,
      user: user1Id,
    },
  ],
  forumCategories: [
    {
      _id: forum1Id,
      title: 'General Discussion',
      subTitle: 'Open any topic you want',
      slug: 'general-discussion',
    },
    {
      _id: forum2Id,
      title: 'Job Requests',
      subTitle: 'Post here job opportunities',
      slug: 'job-requests',
    },
    {
      _id: forum3Id,
      title: 'Developer Jokes',
      subTitle: 'Just funny developing stuff',
      slug: 'developer-jokes',
    },
  ],
  topics: [
    {
      _id: topic1Id,
      title: 'How to learn JS',
      slug: 'how-to-learn-js',
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      forumCategory: forum1Id,
      user: user1Id,
    },
    {
      _id: topic2Id,
      title: 'How to learn JAVA',
      slug: 'how-to-learn-java',
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident and on purpose (injected humour and the like).",
      forumCategory: forum1Id,
      user: user1Id,
    },
    {
      _id: topic3Id,
      title: 'How to learn Python',
      slug: 'how-to-learn-python',
      content:
        "it is a fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      forumCategory: forum1Id,
      user: user1Id,
    },
  ],
  posts: [
    {
      _id: post1Id,
      content: 'Hey there how are you ?',
      slug: 'md43',
      fullSlug: post1CreatedAt.toISOString() + ':md43',
      topic: topic1Id,
      user: user1Id,
      createdAt: post1CreatedAt,
    },
    {
      _id: post2Id,
      content: 'What do you think about this?',
      slug: 'md59',
      fullSlug: post2CreatedAt.toISOString() + ':md59',
      topic: topic1Id,
      user: user2Id,
      createdAt: post2CreatedAt,
    },
    {
      _id: post3Id,
      content: 'I think its nice (:',
      slug: 'md59/md79',
      fullSlug:
        post2CreatedAt.toISOString() +
        ':md59' +
        '/' +
        post3CreatedAt.toISOString() +
        ':md79',
      topic: topic1Id,
      user: user1Id,
      parent: post2Id,
      createdAt: post3CreatedAt,
    },
    {
      _id: post4Id,
      content: 'Good to hear that!',
      slug: 'md59/md79/md89',
      fullSlug:
        post2CreatedAt.toISOString() +
        ':md59' +
        '/' +
        post3CreatedAt.toISOString() +
        ':md79' +
        '/' +
        post4CreatedAt.toISOString() +
        ':md89',
      topic: topic1Id,
      user: user2Id,
      parent: post3Id,
      createdAt: post4CreatedAt,
    },
  ],
};

module.exports = data;
