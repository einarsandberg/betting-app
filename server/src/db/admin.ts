/* eslint-disable */
"use strict"
/**
 * Script to populate database user
 * To run: `npm run create-admin email firstName lastName password isAdmin`
 *  Example : npm run create-admin email@email.com Jane Doe mysecretpassword true
*/
import mongoose from 'mongoose';
import User from '../schemas/User';
// DB
mongoose.connect('mongodb://localhost/betting-app-db', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

async function createAdmin() {
    try {
        const email = process.argv[2];
        const firstName = process.argv[3];
        const lastName = process.argv[4];
        const password = process.argv[5];
        const admin = process.argv[6];
        const user = new User({
            email,
            firstName,
            lastName,
            password,
            admin,
        });
        const createdUser = await user.save();
        console.log('Successfully created user for ' + createdUser.firstName);
        process.exit();
    }
    catch (err) {
        console.error(err);
        process.exit();
    }
};

createAdmin();

