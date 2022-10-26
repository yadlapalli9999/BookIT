import nc from 'next-connect';
import { deleteRoom, getSingleRoom, updateRoom } from '../../../controllers/roomController';
import { authorizeRoles, isAuthenticatedUser } from '../../../middlewares/auth';
import onError from '../../../middlewares/errors';
const handler = nc({onError});

handler.get(getSingleRoom)

handler
.use(isAuthenticatedUser,authorizeRoles('admin'))
.put(updateRoom)

handler
.use(isAuthenticatedUser,authorizeRoles('admin'))
.delete(deleteRoom)

export default handler;