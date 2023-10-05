import dbConnect from '@/backend/config/dbConnect'
import { getSingleProduct } from '@/backend/controllers/productController'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'


const handler = nc({ onError });

dbConnect();

handler.get(getSingleProduct);

export default handler;