import { invokeLambda } from '../services/lambdaService.js';

const invokeLambdaFunction = async (req, res, next) => {
	try {
		const { payload } = req.body;
		const result = await invokeLambda(payload);
		res.json({ success: true, data: result });
	} catch (error) {
		next(error);
	}
};

export { invokeLambdaFunction };
