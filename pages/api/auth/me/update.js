import { updateProfile } from '@/backend/controllers/authController'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'
import upload from '@/backend/utils/multer';
import { isAuthenticated } from '@/backend/middlewares/auth';
import dbConnect from '@/backend/config/dbConnect';


const handler = nc({ onError });

dbConnect();

export const config = {
    api: {
        bodyParser: false
    }
}

const uploadMiddleware = upload.array("image")

handler.use(isAuthenticated, uploadMiddleware).put(updateProfile);

export default handler;