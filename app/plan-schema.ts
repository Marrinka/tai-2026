import { z } from 'zod';

const amount = z.number().finite().min(0).max(10_000_000);
const id = z.string().max(100);

export const planSchema = z.object({
  flightId: id,
  stays: z.object({ holiday: id, work: id, bangkok: id.optional() }),
  overrides: z.record(amount),
  budget: amount,
  costs: z.array(z.object({
    id, name: z.string().min(1).max(150), amount,
  })).max(50),
  checks: z.array(id).max(100),
  events: z.array(z.object({
    id,
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    time: z.string().max(5),
    title: z.string().min(1).max(200),
    category: z.string().max(100),
    price: amount.nullable(),
    note: z.string().max(2000),
    activityId: id.optional(),
    done: z.boolean(),
  })).max(500),
});
