import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';
import { deleteAdminBooking } from '../../../../controllers/bookingController';
import { authorizeRoles, isAuthenticatedUser } from '../../../../middlewares/auth';
import onError from '../../../../middlewares/errors'
const handler = nc({onError});

dbConnect()
handler.use(isAuthenticatedUser,authorizeRoles("admin")).delete(deleteAdminBooking)


export default handler;