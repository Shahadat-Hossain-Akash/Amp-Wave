import dbConnect from '@/backend/config/dbConnect'
import { registerUser } from '@/backend/controllers/authController'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'

const handler = nc({ onError });

dbConnect();

handler.post(registerUser);

export default handler;