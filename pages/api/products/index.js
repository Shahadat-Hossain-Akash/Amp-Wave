import dbConnect from '@/backend/config/dbConnect'
import { getProducts, newProduct } from '@/backend/controllers/productController'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'

//const router = createRouter()

//dbConnect()

//router.get(getProducts)
//router.post(newProduct)

//export default router.handler({onError})

const handler = nc({ onError });

dbConnect();

handler.get(getProducts);

export default handler;