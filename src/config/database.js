const mongoose = require('mongoose');
require('dotenv').config();
require('node:dns').setServers(['1.1.1.1', '1.0.0.1']);

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MONGODB_URI is not set. Add it to your .env file.');
        }

        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
