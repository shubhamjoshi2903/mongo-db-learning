import dotenv from 'dotenv';
import express from 'express';
import { Request, Response } from 'express';
import Logging from '../library/logging';
import http from 'http';

dotenv.config();

const router = express();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
// const MONGO_URL = process.env.MONGO_URL || '';

// const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.cfnmian.mongodb.net/?retryWrites=true&w=majority`;
const MONGO_URL = `mongodb://localhost:27017/`;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};

