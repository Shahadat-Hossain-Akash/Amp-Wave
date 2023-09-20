import dbConnect from '@/backend/config/dbConnect'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'
import { authorizeRole, isAuthenticated } from '@/backend/middlewares/auth';
import { getOrders } from '@/backend/controllers/orderController';

//const router = createRouter()

//dbConnect()

//router.post(registerUser)

//export default router.handler({onError})

const handler = nc({ onError });

dbConnect();



handler.use(isAuthenticated, authorizeRole('admin')).get(getOrders);

export default handler;