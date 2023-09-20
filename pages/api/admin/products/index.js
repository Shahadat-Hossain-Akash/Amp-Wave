import dbConnect from '@/backend/config/dbConnect'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'
import { authorizeRole, isAuthenticated } from '@/backend/middlewares/auth';
import { newProduct } from '@/backend/controllers/productController';

//const router = createRouter()

//dbConnect()

//router.post(registerUser)

//export default router.handler({onError})

const handler = nc({ onError });

dbConnect();



handler.use(isAuthenticated, authorizeRole('admin')).post(newProduct);

export default handler;