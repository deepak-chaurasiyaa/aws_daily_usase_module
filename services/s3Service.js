import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

// Create S3 client instance
const s3Client = new S3Client({ region: process.env.AWS_REGION });

// Function to upload file to S3
const uploadFileToS3 = async ({ folderName, file }) => {
	const key = uuidv4();
	const params = {
		Bucket: process.env.S3_BUCKET_NAME,
		Key: `${folderName}/${key}`,
		Body: file.buffer,
		ContentType: file.mimetype,
		// ACL: 'public-read',
	};

	const command = new PutObjectCommand(params);
	try {
		const response = await s3Client.send(command);
		console.log('File uploaded successfully', response);
		console.log({ key, MimeType: file.mimetype });
		return { ...response, key };
	} catch (error) {
		console.error('Error uploading file', error.message);
		throw new Error('Error uploading file to S3');
	}
};

// Function to get file from S3
const getFileFromS3 = async ({ folderName, key }) => {
	const params = {
		Bucket: process.env.S3_BUCKET_NAME,
		Key: `${folderName}/${key}`,
	};

	const command = new GetObjectCommand(params);
	try {
		const response = await s3Client.send(command);
		const body = await streamToBuffer(response.Body);
		return body.toString('utf-8');
	} catch (error) {
		console.error('Error getting file', error);
		throw new Error('Error getting file from S3');
	}
};

const streamToBuffer = async (stream) => {
	const chunks = [];
	return new Promise((resolve, reject) => {
		stream.on('data', (chunk) => chunks.push(chunk));
		stream.on('error', reject);
		stream.on('end', () => resolve(Buffer.concat(chunks)));
	});
};

// Function to generate pre-signed URL for file
const generatePresignedUrl = async ({ folderName, key }) => {
	const params = {
		Bucket: process.env.S3_BUCKET_NAME,
		Key: `${folderName}/${key}`,
		Expires: 3600, // URL expiration time in seconds
	};

	try {
		const url = await getSignedUrl(s3Client, new GetObjectCommand(params));
		console.log('Pre-signed URL generated successfully', url);
		return url;
	} catch (error) {
		console.error('Error generating pre-signed URL', error);
		throw new Error('Error generating pre-signed URL for file');
	}
};

export { uploadFileToS3, getFileFromS3, generatePresignedUrl };
