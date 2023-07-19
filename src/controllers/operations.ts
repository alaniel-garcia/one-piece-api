import { collectionQueries } from '@utils/helpers';
import models from '@models/index';
import type { NextFunction, Response } from 'express';
import type { ApiModels, CustomRequest } from 'types';

export async function getAll(req: CustomRequest, _res: Response, next: NextFunction): Promise<void> {
  const page: number =
    req.query.page !== undefined && Number(req.query.page as string) > 0 ? parseInt(req.query.page as string) : 1;
  const skip: number = page * collectionQueries.limit - collectionQueries.limit;
  const [, name]: Array<string> = req.path.split('/');
  const Model = models[name as keyof ApiModels];
  const parameters: object = Object.assign(req.query, { skip });

  const { results, count } = await Model.findAndCount(parameters);

  req.payload = {
    page,
    count,
    results
  };

  next();
}
