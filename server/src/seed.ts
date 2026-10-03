import 'dotenv/config';
import argon2 from 'argon2';
import mongoose from 'mongoose';
import { Setting, Shop, Product, User } from './models.js';
async function seed() {
  if (process.env.NODE_ENV === 'production' && process.env.ALLOW_SEED !== 'true') throw new Error('Refusing to seed production');
  await mongoose.connect(process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/7wenet');
  await Promise.all([User.deleteMany({}), Shop.deleteMany({}), Product.deleteMany({})]);
  const password = async (value: string) => argon2.hash(value);
  const accounts = [['admin@7wenet.tn', 'admin', 'Admin'], ['partner1@7wenet.tn', 'partner', 'Partner 1'], ['partner2@7wenet.tn', 'partner', 'Partner 2'], ['partner3@7wenet.tn', 'partner', 'Partner 3'], ['partner4@7wenet.tn', 'partner', 'Partner 4'], ['client1@7wenet.tn', 'client', 'Client 1'], ['client2@7wenet.tn', 'client', 'Client 2']] as const;
  const users = await User.insertMany(await Promise.all(accounts.map(async ([email, role, fullName]) => ({ email, fullName, roles: [role], passwordHash: await password(`${role === 'admin' ? 'Admin' : role === 'client' ? 'Client' : 'Partner'}@12345`) }))));
  const shops = await Shop.insertMany(users.filter((u) => u.roles.includes('partner')).map((u, i) => ({ ownerId: u._id, name: ['Dar Ellabes', 'Chaussures Ben Ali', 'Pending Shop', 'Rejected Shop'][i], slug: ['dar-ellabes', 'chaussures-ben-ali', 'pending-shop', 'rejected-shop'][i], status: i < 2 ? 'APPROVED' : i === 2 ? 'PENDING' : 'REJECTED', rejectionReason: i === 3 ? 'Documents illisibles' : undefined, zone: 'Souk', address: 'Wist El Bled', sections: [{ name: 'General', sortOrder: 0 }] })));
  await Product.insertMany(shops.slice(0, 2).flatMap((shop, index) => Array.from({ length: index === 0 ? 12 : 10 }, (_, i) => ({ shopId: shop._id, name: `${shop.name} article ${i + 1}`, description: 'Produit de qualité', price: 20 + i * 3, stock: 10, images: [{ url: 'https://placehold.co/600x400', type: 'image/jpeg' }] }))));
  await Setting.findByIdAndUpdate('global', { commissionRate: 0.05, orderExpiryHours: 6, pickupWindow: { from: '19:00', to: '22:00' }, inShopWindow: { from: '08:00', to: '18:00' }, cancellationHours: 2 }, { upsert: true });
  await mongoose.disconnect();
}
seed().catch((error) => { console.error(error); process.exitCode = 1; });
