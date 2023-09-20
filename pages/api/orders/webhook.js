import dbConnect from '@/backend/config/dbConnect'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'
import { isAuthenticated } from '@/backend/middlewares/auth';
import { checkoutSession, webhook } from '@/backend/controllers/orderController';

//const router = createRouter()

//dbConnect()

//router.post(registerUser)

//export default router.handler({onError})

const handler = nc({ onError });

dbConnect();

export const config = {
    api: {
        bodyParser: false
    }
}

handler.post(webhook);

export default handler;