"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const logging_1 = __importDefault(require("./library/logging"));
const Author_1 = __importDefault(require("./routes/Author"));
const Book_1 = __importDefault(require("./routes/Book"));
const Category_1 = __importDefault(require("./routes/Category"));
const router = (0, express_1.default)();
router.use((0, cors_1.default)());
/*Connect to mongo */
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    logging_1.default.info('Connected to mongodb');
    startServer();
})
    .catch((err) => {
    logging_1.default.error('Unable to connect to the Database: ');
    logging_1.default.error(err);
});
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({
    extended: true
}));
router.use(express_1.default.static('src/assets/uploads'));
// Only start the server if it MongoDB Connect
const startServer = () => {
    router.use((req, res, next) => {
        logging_1.default.info(`Incoming -> Method [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            // Log the response
            logging_1.default.info(`Incoming -> Method [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}] - status:[${res.statusCode}]`);
        });
        next();
    });
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTION') {
            res.header('Access-control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        }
        next();
    });
    // Routes
    router.use('/author', Author_1.default);
    router.use('/book', Book_1.default);
    router.use('/category', Category_1.default);
    // healthCheck
    router.get('/ping', (req, res, next) => {
        res.status(200).json({
            message: 'Server is Working Fine'
        });
    });
    //Error Handling
    router.use((req, res, next) => {
        const error = new Error('Not Found');
        logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => {
        logging_1.default.info(`Server is running on port ${config_1.config.server.port}`);
    });
};
