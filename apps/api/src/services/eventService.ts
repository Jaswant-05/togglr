import type { Response } from "express";

type PayloadType = {
  res: Response,
  id: string
}

export class EventService {
  private static instance: EventService;
  private clients: PayloadType[] = [];

  private constructor() {}

  static getInstance() {
    if (!EventService.instance) {
      EventService.instance = new EventService();
    }
    return EventService.instance;
  }

  addClient(payload: PayloadType) {
    this.clients.push(payload);
  }

  removeClient(payload: PayloadType) {
    this.clients = this.clients.filter(x => x.id != payload.id);
  }

  broadcastEvent({ featureId, enabled } : { featureId: string, enabled: boolean }){
      // need to send to everyone with the correct feature id the new enabled value here
      this.clients.forEach((client) => {
        const response = {
          featureId,
          enabled
        };

        const formattedResponse = JSON.stringify(response);
        client.res.write(formattedResponse);
      })

  }
}
