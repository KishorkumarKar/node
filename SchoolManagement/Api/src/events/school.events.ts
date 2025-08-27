import { EventEmitter } from "events";

// define event types (optional but good for TS safety)
interface EventMap {
  schoolDeletedId: string;
  schoolDeletedIdCreated: { id: string; name: string };
}

class SchoolEvents extends EventEmitter {
  private static instance: SchoolEvents;

  private constructor() {
    super();
  }

  public static getInstance(): SchoolEvents {
    if (!SchoolEvents.instance) {
      SchoolEvents.instance = new SchoolEvents();
    }
    return SchoolEvents.instance;
  }

  // 🔒 typed emit
  public emitEvent<K extends keyof EventMap>(event: K, data: EventMap[K]) {
    super.emit(event, data);
  }

  // 🔒 typed on
  public onEvent<K extends keyof EventMap>(
    event: K,
    listener: (data: EventMap[K]) => void,
  ) {
    super.on(event, listener);
  }
}

export default SchoolEvents.getInstance();
