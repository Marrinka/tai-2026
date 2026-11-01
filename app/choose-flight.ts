import type {Flight, Plan} from './data';

/** Replace flight-linked dates without duplicating costs or changing user activities. */
export function chooseFlight(plan: Plan, flight: Flight): Plan {
  if (!flight.calendarEvents) return {...plan, flightId: flight.id};
  const replacements = new Map(flight.calendarEvents.map(event => [event.id, event]));
  const existingIds = new Set(plan.events.map(event => event.id));
  const events = plan.events.map(event => {
    const replacement = replacements.get(event.id);
    return replacement ? {...replacement, done: event.done} : event;
  });
  for (const event of flight.calendarEvents) {
    if (!existingIds.has(event.id)) events.push({...event});
  }
  return {...plan, flightId: flight.id, events};
}
