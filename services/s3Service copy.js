import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3();

const S3uploadFile = async (file) => {
	const params = {
		Bucket: process.env.S3_BUCKET_NAME,
		Key: uuidv4(),
		Body: file.buffer,
		ContentType: file.mimetype,
		ACL: 'public-read',
	};
	const data = await s3.upload(params).promise();
	return data.Location;
};

const S3getFile = async (fileId) => {
	const params = {
		Bucket: process.env.S3_BUCKET_NAME,
		Key: fileId,
	};
	const data = await s3.getObject(params).promise();
	return data.Body.toString('utf-8');
};

const generatePresignedUrl = async (fileId) => {
	const params = {
		Bucket: process.env.S3_BUCKET_NAME,
		Key: fileId,
		Expires: 3600, // 1 hour
	};
	return s3.getSignedUrlPromise('getObject', params);
};

export { S3uploadFile, S3getFile, generatePresignedUrl };
