const GraphqlStrategy = require("./strategies");
const User = require("../../database/models/user");

exports.init = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  passport.use(
    "graphql",
    new GraphqlStrategy((options, done) => {
      User.findOne({ email: options.email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        user.validatePassword(options.password, (error, isMatching) => {
          if (error) return done(error);
          if (!isMatching) return done(null, false);
          return done(null, user);
        });
      });
    })
  );
};
