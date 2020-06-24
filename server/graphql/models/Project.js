class Project {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
    this.writeRights = ["admin", "instructor"];
  }
  getAll() {
    return this.Model.find({});
  }
  getById(id) {
    return this.Model.findById({ _id: id });
  }
  create(data) {
    if (!this.user || !this.writeRights.includes(this.user.role)) {
      throw new Error("You are Not Authorized!");
    }
    data.user === this.user;
    return this.Model.create(data);
  }
  findAndUpdate(id, data) {
    return this.Model.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
  }
  findAndDelete(id) {
    return this.Model.findOneAndRemove({ _id: id });
  }
}

module.exports = Project;
