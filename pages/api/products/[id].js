import dbConnect from '@/backend/config/dbConnect'
import {  getSingleProduct, getProducts } from '@/backend/controllers/productController'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'
//const router = createRouter()

//dbConnect()

//router.get(getSingleProduct)

//export default router.handler()

const handler = nc({ onError });

dbConnect();

handler.get(getSingleProduct);

export default handler;