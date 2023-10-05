import dbConnect from '@/backend/config/dbConnect'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'
import { isAuthenticated } from '@/backend/middlewares/auth';
import { checkoutSession } from '@/backend/controllers/orderController';


const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticated).post(checkoutSession);

export default handler;