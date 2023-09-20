
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'
import upload from '@/backend/utils/multer';
import { authorizeRole, isAuthenticated } from '@/backend/middlewares/auth';
import dbConnect from '@/backend/config/dbConnect';
import { uploadProductImages } from '@/backend/controllers/productController';

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

const uploadMiddleware = upload.array("image")

handler.use(uploadMiddleware, isAuthenticated, authorizeRole('admin')).post(uploadProductImages);

export default handler;