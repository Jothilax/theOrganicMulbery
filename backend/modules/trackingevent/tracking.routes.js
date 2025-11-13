import express from 'express';
import createTrackingController from './tracking.controller.js';
import { io } from '../../middleware/socket.js'; // however you expose your io

const router = express.Router();
const trackingCtrl = createTrackingController(io);

router.post('/tracking', trackingCtrl.createTrackingEvent);
router.get('/tracking/:orderId', trackingCtrl.getTrackingEvents);

export default router;
