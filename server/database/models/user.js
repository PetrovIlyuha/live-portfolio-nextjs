const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  avatar: String,
  email: {
    type: String,
    required: 'Email is required',
    lowercase: true,
    index: true,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  name: {
    type: String,
    minlength: [6, 'Name length should exceed 6 characters'],
  },
  username: {
    type: String,
    required: true,
    minlength: [6, "Username can't be shorter than 6 characters"],
  },
  password: {
    type: String,
    minlength: [6, 'Minimum password length is 6 characters'],
    maxlength: [20, 'Maximum password length is 20 characters'],
    required: true,
  },
  role: {
    enum: ['guest', 'admin', 'instructor'],
    type: String,
    required: true,
    default: 'guest',
  },
  info: String,
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.validatePassword = function (candidatePassword, done) {
  bcrypt.compare(candidatePassword, this.password, function (error, isSuccess) {
    if (error) {
      return done(error);
    }
    return done(null, isSuccess);
  });
};

module.exports = mongoose.model('User', userSchema);
