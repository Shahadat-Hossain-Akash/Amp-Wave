import dbConnect from '@/backend/config/dbConnect'
import { getAddresses, newAddress } from '@/backend/controllers/adressController'
import { isAuthenticated } from '@/backend/middlewares/auth'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'


//const router = createRouter()

//dbConnect()
//router.get(getAddresses)
//router.get(getAddress)
//router.post(newAddress)

//export default router.handler({onError})

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticated).get(getAddresses);
handler.use(isAuthenticated).post(newAddress);

export default handler;
