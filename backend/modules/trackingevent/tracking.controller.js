// controllers/tracking.controller.js
import { trackingEventSchema } from "../trackingevent/tracking.dto.js";
import db from "../../config/db.js";

export default function createTrackingController(io) {
  // createTrackingEvent now closes over `io`
  const createTrackingEvent = async (req, res) => {
    try {
      // Validate incoming body (Zod or similar)
      const parsed = trackingEventSchema.parse(req.body);

      // Ensure timestamp is set (optional)
      if (!parsed.timestamp) parsed.timestamp = new Date().toISOString();

      const event = await db.TrackingEvent.create(parsed);

      // Emit live update to clients in the order room
      if (io && parsed.orderId) {
        io.to(parsed.orderId).emit('trackingUpdate', event);
      }

      return res.status(201).json(event);
    } catch (err) {
      // If this is a zod error it has .errors; otherwise fallback to message
      const message = err?.errors ?? err?.message ?? String(err);
      return res.status(400).json({ error: message });
    }
  };

  const getTrackingEvents = async (req, res) => {
    try {
      const { orderId } = req.params;

      const events = await db.TrackingEvent.findAll({
        where: { orderId },
        order: [['timestamp', 'ASC']],
      });

      return res.json(events);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch tracking events' });
    }
  };

  return {
    createTrackingEvent,
    getTrackingEvents,
  };
}
