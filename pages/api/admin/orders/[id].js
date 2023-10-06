import dbConnect from '@/backend/config/dbConnect'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'
import { authorizeRole, isAuthenticated } from '@/backend/middlewares/auth';
import { deleteOrder, getOrder, updateOrder } from '@/backend/controllers/orderController';


const handler = nc({ onError });

dbConnect();



handler.use(isAuthenticated, authorizeRole('admin')).get(getOrder);
handler.use(isAuthenticated, authorizeRole('admin')).put(updateOrder);
handler.use(isAuthenticated, authorizeRole('admin')).delete(deleteOrder);

export default handler;