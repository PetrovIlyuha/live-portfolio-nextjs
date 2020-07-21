const BaseModel = require('./BaseModel');

class ForumCategory extends BaseModel {
  constructor(model, user) {
    super(model, user);
    this.Model = model;
  }
  getAll() {
    return this.Model.find({});
  }
  getBySlug(slug) {
    return this.Model.findOne({ slug }).populate('user');
  }
}

module.exports = ForumCategory;
