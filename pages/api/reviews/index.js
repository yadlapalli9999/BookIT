import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { createRoomReview, deleteReview, getRoomReviews } from '../../../controllers/roomController';
import { isAuthenticatedUser } from '../../../middlewares/auth';
import onError from '../../../middlewares/errors';
const handler = nc({onError});
  dbConnect()

handler.use(isAuthenticatedUser).put(createRoomReview)
handler.use(isAuthenticatedUser).get(getRoomReviews)
handler.use(isAuthenticatedUser).delete(deleteReview)


export default handler;

