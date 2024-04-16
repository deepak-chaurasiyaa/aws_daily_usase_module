import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD,
	},
});

const sendEmail = async (req, res, next) => {
	try {
		const { to, subject, text } = req.body;
		const mailOptions = {
			from: process.env.EMAIL_USERNAME,
			to,
			subject,
			text,
		};
		await transporter.sendMail(mailOptions);
		res.json({ success: true });
	} catch (error) {
		next(error);
	}
};

export { sendEmail };
