import aws from 'aws-sdk';

const uploadImageAws = async (file?: Buffer) => {
    console.log('file', file);
    const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    const params: any = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: Date.now().toString(),
        Body: file
    };

    const { Location: returnUrl }: { Location: string } = await s3.upload(params).promise();
    return returnUrl;
};

export = uploadImageAws;
