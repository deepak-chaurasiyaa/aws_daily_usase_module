import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { errorHandler } from './utils/errorHandlers.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
