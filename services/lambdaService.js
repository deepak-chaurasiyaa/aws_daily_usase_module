import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

const lambdaClient = new LambdaClient({ region: 'your-region' });

const invokeLambda = async (payload) => {
	const params = {
		FunctionName: process.env.LAMBDA_FUNCTION_NAME,
		Payload: JSON.stringify(payload),
	};
	const command = new InvokeCommand(params);
	try {
		const response = await lambdaClient.send(command);
		const responseBody = JSON.parse(response.Payload);
		return responseBody;
	} catch (error) {
		console.error('Error invoking Lambda function', error);
		throw error;
	}
};

export { invokeLambda };
