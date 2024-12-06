import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express, { Express } from 'express';

dotenv.config();
// import postsRoute from "./routes/posts_route";
// import commentsRoute from "./routes/comments_route";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.on('connection', () => console.log('connected to database'));

const initApp = async (): Promise<Express> => {
	const db_url = process.env.DB_URL;
	if (db_url === undefined) {
		throw Error('DB_URL not defined in environment');
	}

	await mongoose.connect(db_url);

	return app;
};

export default initApp;
