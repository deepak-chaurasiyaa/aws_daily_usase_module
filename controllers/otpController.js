import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const snsClient = new SNSClient({ region: process.env.AWS_REGION });

const sendOTP = async (req, res, next) => {
	const { otp, phoneNumber } = req.body;
	const params = {
		Message: `Your OTP is: ${otp}`,
		PhoneNumber: phoneNumber,
	};
	const command = new PublishCommand(params);
	try {
		const response = await snsClient.send(command);
		res.send(response);
		console.log('OTP sent successfully', response);
	} catch (error) {
		console.error('Error sending OTP', error);
		throw error;
	}
};

export { sendOTP };
