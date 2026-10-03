import 'dotenv/config';
import argon2 from 'argon2';
import mongoose from 'mongoose';
import { User } from './models.js';

const [email, password, fullName = 'Platform administrator'] = process.argv.slice(2);
if (!email || !password || password.length < 8) {
  console.error('Usage: npm run create-admin -- admin@example.com "strong-password" "Full Name"');
  process.exit(1);
}

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/7wenet');
  const passwordHash = await argon2.hash(password);
  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { $set: { email: email.toLowerCase(), fullName, passwordHash, status: 'active' }, $addToSet: { roles: 'admin' } },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  console.log(`Admin account ready: ${user.email}`);
  await mongoose.disconnect();
}
createAdmin().catch((error) => { console.error(error); process.exitCode = 1; });
