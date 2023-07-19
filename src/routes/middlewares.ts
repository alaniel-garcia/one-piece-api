import { getAll } from 'controllers/operations';
import type { CustomRequest, EndpointHandler, ProcessedPayload } from 'types';
import type { NextFunction, Response } from 'express';
import { BASE_URL, collectionQueries, message } from '@utils/helpers';

// RESPONSES
// function sanitizeQueryParams(model) {
// }
function generatePageUrls(req: CustomRequest, res: Response, next: NextFunction): void {
  let page: string | number;
  let count: number;
  let results: Array<any>;

  // ended up narrowing payload types in order to use RawPayload first and then ProcessedPayload
  if (!('info' in req.payload)) {
    page = typeof req.payload.page === 'string' ? parseInt(req.payload.page) : req.payload.page;
    count = req.payload.count;
    results = req.payload.results;

    const pages = Math.ceil(count / collectionQueries.limit);
    if (page > pages) {
      res.status(404).json({ error: message.noPage });
      return;
    }
    const path = req.path.replace(/\//g, '');
    const query = Object.keys(req.query).reduce((acc, key) => {
      // if key is an allowed query for the path
      if (collectionQueries.queries[path].includes(key)) {
        // add it to the url
        return acc + `&${key}=${String(req.query[key])}`;
      }
      return acc;
    }, '');

    req.payload = {
      info: {
        count,
        page,
        totalPages: pages,
        next: page >= pages ? null : `${BASE_URL}${req.path}?page=${page + 1}${query}`, // expression to calculate next page including the query
        prev: page < 2 ? null : `${BASE_URL}${req.path}?page=${page - 1}${query}` // expression to calculate previous page including the query
      },
      results
    } as unknown as ProcessedPayload;
  }

  next();
}

function sendResponse(req: CustomRequest<ProcessedPayload>, res: Response): void {
  res.json(req.payload);
}

export default (_model: string): EndpointHandler => {
  return {
    find: [getAll, generatePageUrls, sendResponse],
    findById: []
  };
};
