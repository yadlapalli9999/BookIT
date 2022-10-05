import nc from 'next-connect';
import { getSingleRoom, updateRoom } from '../../../controllers/roomController';

const handler = nc();

handler.get(getSingleRoom)

handler.put(updateRoom)

export default handler;