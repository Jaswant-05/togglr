import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError{
  constructor(){
    super("Unauthorized", 401)
    this.name="UnauthorizedError"
  }
}

export class BadRequestError extends BaseError{
  constructor(){
    super("Bad Request", 400)
    this.name="BadRequestError"
  }
}

export class NotFoundError extends BaseError{
  constructor(){
    super("Not Found", 404)
    this.name="NotFoundError"
  }
}

export class ForbiddenError extends BaseError{
  constructor(){
    super("Access Forbidden", 402)
    this.name="ForbiddenError"
  }
}

export class InternalServerError extends BaseError{
  constructor(){
    super("Internal Server Error", 500)
    this.name="InternalServerError"
  }
}