import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({ region: process.env.AWS_REGION });

const sendEmail = async (req, res, next) => {
	try {
		const { to, subject, text } = req.body;
		const params = {
			Destination: {
				ToAddresses: [to],
			},
			Message: {
				Body: {
					Text: {
						Charset: 'UTF-8',
						Data: text,
					},
				},
				Subject: {
					Charset: 'UTF-8',
					Data: subject,
				},
			},
			Source: process.env.EMAIL_USERNAME, // Sender email address
		};
		const command = new SendEmailCommand(params);
		await sesClient.send(command);
		res.json({ success: true });
	} catch (error) {
		next(error);
	}
};

export { sendEmail };
