import nc from 'next-connect';
import { deleteRoom, getSingleRoom, updateRoom } from '../../../controllers/roomController';
import onError from '../../../middlewares/errors';
const handler = nc({onError});

handler.get(getSingleRoom)

handler.put(updateRoom)

handler.delete(deleteRoom)

export default handler;