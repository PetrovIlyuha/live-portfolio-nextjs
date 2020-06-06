const { projects } = require("./data");

const Project = require("../database/models/project");

class FakeDB {
  async cleanData() {
    await Project.deleteMany({});
  }

  async addData() {
    await Project.create(projects);
  }

  async populate() {
    await this.cleanData();
    await this.addData();
  }
}

module.exports = new FakeDB();
