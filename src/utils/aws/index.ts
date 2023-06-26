import aws from 'aws-sdk';

const uploadImageAws = (myFirstfile: Buffer, file: any) => {
    console.log('myFirstfile', myFirstfile);
    console.log('file', file);

    const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    const params: any = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: myFirstfile,
        Body: file
    };

    s3.upload(params, (err: any, data: any) => {
        console.log('data', data);
        if (err) {
            console.log('err', err);
            Promise.reject(err);
        }
        Promise.resolve(data.Location);
    });
};

export = uploadImageAws;
