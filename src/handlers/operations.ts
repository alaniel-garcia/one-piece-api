/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { collectionQueries, getPopulationSettings, message } from '@utils/helpers';
import models from '@models/index';
import type { NextFunction, Response } from 'express';
import type { ApiModelsHandler, CharacterModel, CustomRequest, GetByIdData } from 'types';
import { catchErrors } from './errors';
import type mongoose from 'mongoose';

interface CustomResponse {
  data: GetByIdData | null;
  error: {
    message: string;
    status: number;
  } | null;
}

interface CustomResponseParams {
  data?: GetByIdData;
  status?: number;
  message?: string;
}

const buildResponse = ({ data, status, message }: CustomResponseParams): CustomResponse => {
  if (data != null) {
    return {
      data,
      error: null
    };
  }

  return {
    data: null,
    error: {
      message: message ?? '',
      status: status ?? 500
    }
  };
};
async function queryById(name: string, id: string | Array<string | number>): Promise<CustomResponse> {
  const Model = models[name as keyof ApiModelsHandler] as CharacterModel;
  // it's precise to understand than even though this const model can be any other model we have developed, it is asserted as Character model,
  // since otherwise if we let it as an ApiModel type, it would require a complete refactor of Api models flow in order to give
  // typescript a good understanding on types, based on this complex scenario where we deal with union types

  const populationSettings = getPopulationSettings(Model.modelName) as mongoose.PopulateOptions; // asserts settings as PopulationOptions so when false value, this can be passed to populate method and skip the method when no need to populate

  // If the param is an array
  if (Array.isArray(id)) {
    try {
      const data = await Model.find({
        id: { $in: id }
      })
        .select(collectionQueries.exclude)
        .populate(populationSettings);
      return buildResponse({ data: Model.structure(data) });
    } catch (error) {
      const err = error as Error;
      return buildResponse({ status: 500, message: err.message });
    }
  }

  // If the param is not a number
  if (Number.isNaN(parseInt(id))) {
    return buildResponse({ status: 500, message: message.badParam });
  }

  const data = await Model.findOne({ id }).select(collectionQueries.exclude).populate(populationSettings);

  if (data == null) {
    return buildResponse({ status: 404, message: message[`no${Model.modelName}`] });
  }

  return buildResponse({ data: Model.structure(data) });
}

async function getAll(req: CustomRequest, _res: Response, next: NextFunction): Promise<void> {
  const page: number =
    req.query.page !== undefined && Number(req.query.page as string) > 0 ? parseInt(req.query.page as string) : 1;
  const skip: number = page * collectionQueries.limit - collectionQueries.limit;
  const [, name]: Array<string> = req.path.split('/');
  const Model = models[name as keyof ApiModelsHandler];
  const parameters: object = Object.assign(req.query, { skip });

  const { results, count } = await Model.findAndCount(parameters);

  req.payload = {
    page,
    count,
    results
  };

  next();
}

async function getById(
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> {
  const [, name] = req.path.split('/');
  const { data, error } = await queryById(name, req.params.id);

  if (error != null) {
    return res.status(error.status).json({ error: error.message });
  }

  req.payload = data!;
  next();
}

export default {
  getAll: catchErrors(getAll),
  getById: catchErrors(getById)
};
