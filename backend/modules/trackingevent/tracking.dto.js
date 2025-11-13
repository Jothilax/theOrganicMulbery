// tracking.validation.js
import { z } from 'zod';

/**
 * A permissive schema that accepts either the older "orderId"/"timestamp" fields
 * used by your controller, or the DB-style snake_case fields like order_id.
 * Make fields optional so existing requests pass validation while still catching
 * obviously-bad payloads.
 */
export const trackingEventSchema = z.object({
  // camelCase variant (controller expects these)
  orderId: z.string().optional(),
  event: z.string().optional(),
  timestamp: z.string().optional(),

  // snake_case variant (Sequelize model uses order_id)
  order_id: z.string().uuid().optional(),
  status: z.string().optional(),
  location: z.string().optional(),
  remarks: z.string().optional(),

  // audit fields
  created_by: z.string().uuid().optional(),
  updated_by: z.string().uuid().optional(),

  // allow extra unknown properties
}).passthrough();
