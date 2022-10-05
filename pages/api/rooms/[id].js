import nc from 'next-connect';
import { deleteRoom, getSingleRoom, updateRoom } from '../../../controllers/roomController';

const handler = nc();

handler.get(getSingleRoom)

handler.put(updateRoom)

handler.delete(deleteRoom)

export default handler;