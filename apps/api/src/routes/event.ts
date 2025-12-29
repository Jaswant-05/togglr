import express, { Request, Response } from "express";
import { EventService } from "../services/eventService";
import z from "zod";
const router = express.Router();

const eventPayloadSchema = z.object({
  id: z.string().uuid(),
});

// type EventPayload = z.infer<typeof eventPayloadSchema>;

router.post('/events', async(req: Request, res: Response) => {
  const { data, error } = eventPayloadSchema.safeParse(req.body);
  if(error){
    res.status(400).json({
      error : error.message
    })
    return;
  }
  // Headers to keep the connection alive
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  // Send an initial message
  res.write(`data: Connected to server\n\n`);
  
  // get the singleton object and add client
  const eventService = EventService.getInstance();

  //setup the payload 
  const payload = {
    res,
    id: data.id
  }
  
  eventService.addClient(payload);

  req.on('close', () => {
    eventService.removeClient(payload);
    res.end();
  });
});
