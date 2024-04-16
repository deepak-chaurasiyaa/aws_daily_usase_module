import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const secretsManagerClient = new SecretsManagerClient({ region: process.env.AWS_REGION });

const getDatabaseCredentials = async () => {
	const params = {
		SecretId: process.env.SECRET_ID,
	};
	try {
		const command = new GetSecretValueCommand(params);
		const response = await secretsManagerClient.send(command);
		if (response.SecretString) {
			const secret = JSON.parse(response.SecretString);
			const username = secret.username;
			const password = secret.password;
			return { username, password };
		} else {
			throw new Error('Secret value not found');
		}
	} catch (error) {
		console.error('Error retrieving database credentials', error);
		throw error;
	}
};
getDatabaseCredentials()

export { getDatabaseCredentials };
