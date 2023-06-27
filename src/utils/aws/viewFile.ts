import aws from 'aws-sdk';

const viewImageAws = async (file?: string) => {
    console.log('file', file);
    const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    const params: any = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: 'https%3A//s3-nodejs-12345.s3.ap-south-1.amazonaws.com/1687872772890'
    };

    const s3Stream = await s3.getObject(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    });
    return s3Stream;
};

export = viewImageAws;
