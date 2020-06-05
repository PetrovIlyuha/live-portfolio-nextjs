const mongoose = require("mongoose");
const config = require("../config/dev");

require("./models/project");

exports.connect = () => {
  mongoose.connect(
    config.DB_URI,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    },
    () => {
      console.log("Mongo Atlas Cluster successfully connected ✅");
    }
  );
};
