const mongoose = require("mongoose");

// connecting with DB
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the application if unable to connect to MongoDB
  }
}

module.exports = {
  connectToDatabase,
};
