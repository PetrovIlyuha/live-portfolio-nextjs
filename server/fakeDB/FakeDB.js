const { projects, users } = require("./data");

const Project = require("../database/models/project");
const User = require("../database/models/user");
class FakeDB {
  async cleanData() {
    await Project.deleteMany({});
    await User.deleteMany({});
  }

  async addData() {
    await User.create(users);
    await Project.create(projects);
  }

  async populate() {
    await this.cleanData();
    await this.addData();
  }
}

module.exports = new FakeDB();
