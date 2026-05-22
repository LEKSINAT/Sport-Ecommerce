import { NextFunction, Request, Response } from "express";

type AsyncHandler<
  TParams = Record<string, string>,
  TResponseBody = unknown,
  TRequestBody = unknown,
  TQuery = Record<string, string | string[]>,
> = (
  req: Request<TParams, TResponseBody, TRequestBody, TQuery>,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

export const asyncHandler = <
  TParams = Record<string, string>,
  TResponseBody = unknown,
  TRequestBody = unknown,
  TQuery = Record<string, string | string[]>,
>(
  handler: AsyncHandler<TParams, TResponseBody, TRequestBody, TQuery>,
) => {
  return (req: Request<TParams, TResponseBody, TRequestBody, TQuery>, res: Response, next: NextFunction): void => {
    handler(req, res, next).catch(next);
  };
};
