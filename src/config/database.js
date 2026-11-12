const mongoose = require('mongoose');
require('node:dns').setServers(['1.1.1.1', '1.0.0.1']);

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ravsrvkai_db_user:test@namastenode.ptlfhgw.mongodb.net/devTinder');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
