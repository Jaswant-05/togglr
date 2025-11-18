import { Prisma } from "@workspace/db/client";
import { NextFunction, Request, Response } from "express";
import {  BadRequestError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError } from "@workspace/errors/errors"

export const errorhandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  if(err instanceof Prisma.PrismaClientKnownRequestError){
    const serverError = new InternalServerError()
    return res.status(serverError.statusCode).json({
      error : serverError.message
    })
  }
  else if(err instanceof UnauthorizedError){
    return res.status(err.statusCode).json({
      error : err.message
    })
  } 
  else if(err instanceof NotFoundError){
    return res.status(err.statusCode).json({
      error : err.message
    })
  } 
  else if(err instanceof BadRequestError){
    return res.status(err.statusCode).json({
      error : err.message
    })
  } 
  else if(err instanceof ForbiddenError){
    return res.status(err.statusCode).json({
      error : err.message
    })
  }
  else if(err instanceof InternalServerError){
    return res.status(err.statusCode).json({
      error : err.message
    })
  }
  else{
    return res.status(520).json({
      error : "Unkown Error Occured"
    })
  }
}

