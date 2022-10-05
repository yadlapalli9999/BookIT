import nc from 'next-connect';
import { getSingleRoom } from '../../../controllers/roomController';

const handler = nc();

handler.get(getSingleRoom)

export default handler;