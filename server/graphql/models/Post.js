const moment = require('moment');

class Post {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }
  getAllByTopic(topic) {
    return this.Model.find({ topic })
      .sort('createdAt')
      .populate('topic')
      .populate('user')
      .populate({ path: 'parent', populate: 'user' });
  }
  async create(post) {
    console.log(this.user);
    if (!this.user) {
      throw new Error("You're not authenticated to create Posts!");
    }
    post.user = this.user;
    const createdAt = moment().toISOString();
    const slugPart = `-${(Math.random().toString(16) + '0000000').substr(
      2,
      8
    )}`;
    const fullSlugPart = createdAt + ':' + slugPart;
    if (post.parent) {
      const parent = await this.Model.findById(post.parent);
      post.slug = parent.slug + '/' + slugPart;
      post.fullSlug = parent.fullSlug + '/' + fullSlugPart;
    } else {
      post.slug = slugPart;
      post.fullSlug = fullSlugPart;
    }
    const createdPost = await this.Model.create(post);
    return this.Model.findById(createdPost._id)
      .populate('topic')
      .populate({ path: 'parent', populate: 'user' });
  }
}

module.exports = Post;
