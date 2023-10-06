import dbConnect from '@/backend/config/dbConnect'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'
import { authorizeRole, isAuthenticated } from '@/backend/middlewares/auth';
import { deleteProduct, updateProduct } from '@/backend/controllers/productController';


const handler = nc({ onError });

dbConnect();



handler.use(isAuthenticated, authorizeRole('admin')).put(updateProduct);
handler.use(isAuthenticated, authorizeRole('admin')).delete(deleteProduct);

export default handler;