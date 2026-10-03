import mongoose from 'mongoose';
import { app } from './app.js';
const port = Number(process.env.PORT ?? 4000);
mongoose.connect(process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/7wenet').then(() => app.listen(port, () => console.log(`API listening on ${port}`))).catch((error) => { console.error('MongoDB connection failed. Set MONGODB_URI to a reachable MongoDB Atlas URI or start MongoDB locally.'); console.error(error); process.exit(1); });
