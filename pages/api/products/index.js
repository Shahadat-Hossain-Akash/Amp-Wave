import dbConnect from '@/backend/config/dbConnect'
import { getProducts } from '@/backend/controllers/productController'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'

const handler = nc({ onError });

dbConnect();

handler.get(getProducts);

export default handler;