import { generatePresignedUrl, getFileFromS3, uploadFileToS3 } from '../services/s3Service.js'; // Adjust the import statement as per your file structure
const folderName = 'test';
const uploadFile = async (req, res, next) => {
	try {
		const file = req.file;
		if (!file) {
			return res.status(400).json({ success: false, error: 'No file uploaded' });
		}
		const uploadedFile = await uploadFileToS3({ folderName, file });
		res.json({ success: true, data: uploadedFile });
	} catch (error) {
		next(error);
	}
};

const getFile = async (req, res, next) => {
	try {
		const key = req.params.fileId;
		const file = await getFileFromS3({ folderName, key });
		res.json({ success: true, data: file });
	} catch (error) {
		next(error);
	}
};

const getPresignedUrl = async (req, res, next) => {
	try {
		const key = req.params.fileId;
		const url = await generatePresignedUrl({ folderName, key });
		res.json({ success: true, url });
	} catch (error) {
		next(error);
	}
};

export { uploadFile, getFile, getPresignedUrl };
