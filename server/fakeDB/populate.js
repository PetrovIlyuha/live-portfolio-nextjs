const mongoose = require("mongoose");
const config = require("../config/dev");
const fakeDB = require("./FakeDB");

mongoose.connect(
  config.DB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  async () => {
    console.log("Populating DB with temporary data STARTED ✅");
    await fakeDB.populate();
    await mongoose.connection.close();
    console.log("Populating DB with temporary data ENDED ✅");
  }
);
