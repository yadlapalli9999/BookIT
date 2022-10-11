import nc from 'next-connect';
import dbConnect from '../../config/dbConnect';
import { currentProfileUser } from '../../controllers/authController';
import { isAuthenticatedUser } from '../../middlewares/auth';
import onError from '../../middlewares/errors';
const handler = nc({onError});
dbConnect()
handler.use(isAuthenticatedUser).get(currentProfileUser)

export default handler;