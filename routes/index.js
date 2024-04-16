import express from 'express';
import { uploadFile, getFile, getPresignedUrl } from '../controllers/fileController.js';
import { invokeLambdaFunction } from '../controllers/lambdaController.js';
import { sendEmail } from '../controllers/emailControllers.js';
import { sendOTP } from '../controllers/otpController.js';
import multer from 'multer';

// Multer middleware configuration
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/file/:fileId', getFile);
router.get('/file/:fileId/presigned-url', getPresignedUrl);
router.post('/invoke-lambda', invokeLambdaFunction);
router.post('/send-email', sendEmail);
router.post('/send-otp', sendOTP);

export default router;
