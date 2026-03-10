var mongoose = require('mongoose');
require("dotenv").config();

const dbconnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            connectTimeoutMS: 30000, // Increase timeout
            socketTimeoutMS: 45000, // Prevent disconnections  
            maxPoolSize: 10, // Limit connection pool size  
            retryWrites: true // Enable automatic retries on failed writes
        }).then(() => {
            console.log("✅ Database connection successful");
        }).catch((err) => {
            console.error("Error Time:", new Date(), "❌ Database connection error:", err.message);
        });

        // Handle MongoDB disconnection and auto-reconnect
        mongoose.connection.on("disconnected", () => {
            console.error("⚠️ MongoDB disconnected! Attempting to reconnect...");
            mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                retryWrites: true
            });
        });

        mongoose.set('debug', function (coll, method, query) {

        });

    } catch (err) {
        console.error("Error Time:", new Date(), "❌ MongoDB connection error:", err);
    }
};

module.exports = dbconnection;
