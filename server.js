import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: './config/.env'});

process.on('uncaughtException', (error)=>{
    console.log('Uncaught exception!');
    console.log(error.name, error.message);
    process.exit(1);
});

import app from './app.js';

const port = process.env.PORT;

const server = app.listen(port, ()=>{
    console.log(`Server connected on port ${port}`);
})

const DB_URL = process.env.MONGODB_CONNECTION.replace('<PASSWORD>', process.env.MONGODB_PASSWORD);
console.log(DB_URL);
mongoose.connect(DB_URL).then(()=>{
    console.log('Successfully connected to database');
});

process.on('unhandledRejection', (error)=>{
    console.log('Unhanled Rejection!');
    server.close(()=>{
        console.log(error.name, error.message);
        process.exit(1);
    });
});

process.on('SIGTERM', ()=>{
    console.log('SIGTERM recieved!');
    server.close(()=>{
        console.log('Server shutting down!');
    });
});