import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { checkReviewAvailability } from '../../../controllers/roomController';
import { isAuthenticatedUser } from '../../../middlewares/auth';
import onError from '../../../middlewares/errors';
const handler = nc({onError});
  dbConnect()

handler.use(isAuthenticatedUser).get(checkReviewAvailability)

export default handler;

