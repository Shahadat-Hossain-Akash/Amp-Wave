import dbConnect from '@/backend/config/dbConnect'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'
import { isAuthenticated } from '@/backend/middlewares/auth';
import { canReview } from '@/backend/controllers/orderController';


const handler = nc({ onError });

dbConnect();



handler.use(isAuthenticated).get(canReview);

export default handler;