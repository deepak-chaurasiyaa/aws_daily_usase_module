import twilio from 'twilio';

const sendOTP = async (req, res, next) => {
	try {
		const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
		const { phoneNumber } = req.body;
		const otp = generateOTP();
		await client.messages.create({
			body: `Your OTP is: ${otp}`,
			from: process.env.TWILIO_PHONE_NUMBER,
			to: phoneNumber,
		});
		res.json({ success: true });
	} catch (error) {
		next(error);
	}
};

const generateOTP = () => {
	return Math.floor(1000 + Math.random() * 9000);
};

export { sendOTP };
