"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uploadImageAws = (myFirstfile, file) => {
    const s3 = new aws_sdk_1.default.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: myFirstfile,
        Body: file
    };
    s3.upload(params, (err, data) => {
        console.log('data', data);
        if (err) {
            console.log('err', err);
            Promise.reject(err);
        }
        Promise.resolve(data.Location);
    });
};
module.exports = uploadImageAws;
