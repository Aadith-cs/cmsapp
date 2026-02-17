const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;

        // Check if URI is valid or if it's the default template
        const isInvalidURI = !uri || uri.includes('<password>') || uri.includes('admin123'); // naive check for template credentials

        if (isInvalidURI) {
            console.log('No valid MONGO_URI found or connection failed previously. Starting in-memory instance...');
            try {
                const mongod = await MongoMemoryServer.create();
                uri = mongod.getUri();
                console.log(`In-memory MongoDB URI: ${uri}`);
            } catch (err) {
                console.error("Failed to start MongoMemoryServer", err);
                // Fallback to local if memory server fails? No, just let it error/exit.
                throw err;
            }
        }

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // If we are in test mode, we might not want to exit process immediately so tests can report failure? 
        // But for app startup, yes.
        if (process.env.NODE_ENV !== 'test') {
            process.exit(1);
        }
    }
};

module.exports = connectDB;
