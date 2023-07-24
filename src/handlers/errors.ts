import type { ErrorRequestHandler, NextFunction, RequestHandler, Response } from 'express';
import type { CustomRequest } from 'types';

interface CustomError extends Error {
  status?: number;
}

export const catchErrors = (fn: any) => (req: CustomRequest, res: Response, next: NextFunction) =>
  fn(req, res, next).catch(next);

export const notFound: RequestHandler = (_req, _res, next): void => {
  const err: CustomError = new Error('There is nothing here.');
  err.status = 404;
  next(err);
};

export const productionErrors: ErrorRequestHandler = (err, _req, res, _next): void => {
  res.status(err.status ?? 500);
  res.json({ error: err.message });
};
