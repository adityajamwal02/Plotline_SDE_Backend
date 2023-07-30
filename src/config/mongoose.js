// Managed to connect MongoDB (database which is used here due to its simplicity and BASE properties), cleaning up the connection after process exit

const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URL;

function cleanup() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
}

/// url is included via .env file (not visible within repository for security purposes), connected via mongoose

module.exports=app => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("Connected to MongoDB"))
      .catch(err => console.log("Error connecting to MongoDB:", err));
    
    mongoose.Promise = global.Promise;
    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("SIGHUP", cleanup);

    if (app) {
        app.set("mongoose", mongoose);
    }
};
