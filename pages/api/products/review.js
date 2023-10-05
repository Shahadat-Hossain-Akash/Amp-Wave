import dbConnect from '@/backend/config/dbConnect'
import { createProductReview } from '@/backend/controllers/productController'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'
import { isAuthenticated } from '@/backend/middlewares/auth';


const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticated).put(createProductReview);

export default handler;