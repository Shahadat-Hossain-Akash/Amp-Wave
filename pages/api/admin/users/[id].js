import dbConnect from '@/backend/config/dbConnect'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'
import { authorizeRole, isAuthenticated } from '@/backend/middlewares/auth';
import { deleteUser, getUser, updateUser } from '@/backend/controllers/authController';

//const router = createRouter()

//dbConnect()

//router.post(registerUser)

//export default router.handler({onError})

const handler = nc({ onError });

dbConnect();



handler.use(isAuthenticated, authorizeRole('admin')).get(getUser);
handler.use(isAuthenticated, authorizeRole('admin')).put(updateUser);
handler.use(isAuthenticated, authorizeRole('admin')).delete(deleteUser);

export default handler;