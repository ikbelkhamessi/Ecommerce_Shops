import { Shop, type UserDocument } from '../models.js';
export async function reviewApplication(shopId: string, actor: UserDocument & { _id: unknown }, decision: 'APPROVED' | 'REJECTED', reason?: string) {
  if (decision === 'REJECTED' && !reason?.trim()) throw new Error('A rejection reason is required');
  const shop = await Shop.findByIdAndUpdate(shopId, { status: decision, rejectionReason: decision === 'REJECTED' ? reason?.trim() : undefined, reviewedBy: actor._id, reviewedAt: new Date() }, { new: true });
  if (!shop) throw new Error('Shop application not found');
  return shop;
}
