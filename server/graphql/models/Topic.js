const slugify = require('slugify');
class Topic {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }
  getAllByCategory(forumCategory) {
    return this.Model.find({ forumCategory })
      .populate('user')
      .populate('forumCategory');
  }
  async _create(topicData) {
    const createdTopic = await this.Model.create(topicData);
    return this.Model.findById(createdTopic._id)
      .populate('user')
      .populate('forumCategory');
  }

  async create(topicData) {
    if (!this.user) {
      throw new Error('You are not authenticated to create topic!');
    }
    topicData.user = this.user;

    topicData.slug = slugify(topicData.title, { lower: true });

    try {
      const topic = await this._create(topicData);
      return topic;
    } catch (e) {
      if (e.code === 11000 && e.keyPattern && e.keyPattern.slug) {
        topicData.slug += `-${(Math.random().toString(16) + '0000000').substr(
          2,
          8
        )}`;
        const topic = await this._create(topicData);
        return topic;
      }
      return null;
    }
  }
}

module.exports = Topic;
