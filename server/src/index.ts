import dotenv from 'dotenv';
dotenv.config();
import app from './server';
import mongoose from 'mongoose';

// Start the server
const port = Number(process.env.PORT || 8000);
app.listen(port, () => {
    console.info('Express server started on port: ' + port);
});

// DB
mongoose.connect('mongodb://localhost/allsvenskan-betting-app-db', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));