import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/logging';
import authorRoutes from './routes/Author';
import bookRoutes from './routes/Book';
import categoryRoutes from './routes/Category';
import cors from 'cors';
import bodyParser from 'body-parser';

const router = express();

router.use(cors());

/*Connect to mongo */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connected to mongodb');
        startServer();
    })
    .catch((err) => {
        Logging.error('Unable to connect to the Database: ');
        Logging.error(err);
    });

// Only start the server if it MongoDB Connect
const startServer = () => {
    router.use((req, res, next) => {
        Logging.info(`Incoming -> Method [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            // Log the response
            Logging.info(`Incoming -> Method [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}] - status:[${res.statusCode}]`);
        });
        next();
    });

    router.use(bodyParser.json());
    router.use(express.urlencoded({ extended: true }));

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTION') {
            res.header('Access-control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        }
        next();
    });

    // Routes
    router.use('/author', authorRoutes);
    router.use('/book', bookRoutes);
    router.use('/category', categoryRoutes);
    // healthCheck
    router.get('/ping', (req, res, next) => {
        res.status(200).json({
            message: 'Server is Working Fine'
        });
    });

    //Error Handling
    router.use((req, res, next) => {
        const error = new Error('Not Found');
        Logging.error(error);
        return res.status(404).json({ message: error.message });
    });
    http.createServer(router).listen(config.server.port, () => {
        Logging.info(`Server is running on port ${config.server.port}`);
    });
};
