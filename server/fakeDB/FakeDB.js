const { projects, users, forumCategories, topics } = require('./data');

const Project = require('../database/models/project');
const User = require('../database/models/user');
const ForumCategory = require('../database/models/forumCategory');
const Topic = require('../database/models/topic');
class FakeDB {
  async cleanData() {
    await Project.deleteMany({});
    await User.deleteMany({});
    await ForumCategory.deleteMany({});
    await Topic.deleteMany({});
  }

  async addData() {
    await User.create(users);
    await Project.create(projects);
    await ForumCategory.create(forumCategories);
    await Topic.create(topics);
  }

  async populate() {
    await this.cleanData();
    await this.addData();
  }
}

module.exports = new FakeDB();
