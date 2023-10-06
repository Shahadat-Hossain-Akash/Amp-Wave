import dbConnect from '@/backend/config/dbConnect'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'
import { authorizeRole, isAuthenticated } from '@/backend/middlewares/auth';
import { getUsers } from '@/backend/controllers/authController';


const handler = nc({ onError });

dbConnect();



handler.use(isAuthenticated, authorizeRole('admin')).get(getUsers);

export default handler;