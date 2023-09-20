import dbConnect from '@/backend/config/dbConnect'
import { deleteAddress, getAddress,getAddresses , updateAddress } from '@/backend/controllers/adressController'
import { isAuthenticated } from '@/backend/middlewares/auth'
import nc from 'next-connect'
import onError from '@/backend/middlewares/errors'

//const router = createRouter()

{/*dbConnect()
router.get(getAddresses)
router.get(getAddress)
router.put(updateAddress)
router.delete(deleteAddress)

export default router.handler({onError})*/}

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticated).get(getAddress);
handler.use(isAuthenticated).put(updateAddress);
handler.use(isAuthenticated).delete(deleteAddress);

export default handler;