/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { getAll } from 'controllers/operations';
import type { ApiDocument, CustomRequest, EndpointHandler, ProcessedPayload } from 'types';
import type { NextFunction, Response } from 'express';
import { BASE_URL, collectionQueries, message, turnPathIntoModel } from '@utils/helpers';
import { type ValidationChain, query } from 'express-validator';

// When call query() from express-validator, it returns a validation chain,
// which is essentially a middleware function. This validation chain not only defines
// the validations and sanitizations for the req.query data but also automatically persists
// the updated field value back into req.query, making it usable by other express-validator functions,
// route handler code, and other middlewares.
const sanitizeQueryParams = (model: string): ValidationChain => {
  return query(collectionQueries.queries[model]).trim();
};

interface notEmptyQueries {
  [key: string]: string | Array<string>; // Index signature to ensure keys are strings and values are strings or string arrays
}

// Function to filter empty query parameters
function checkSanitization(req: CustomRequest, _res: Response, next: NextFunction): void {
  // Create an empty object to store sanitized query parameters
  const sanitizedQuery: notEmptyQueries = {};

  for (const key in req.query) {
    if (
      req.query[key] !== undefined &&
      req.query[key] !== null &&
      (req.query[key] as string | Array<string>).length > 0
    ) {
      // If the query parameter is not empty, add it to the sanitizedQuery object
      sanitizedQuery[key] = req.query[key] as string | Array<string>;
    }
  }

  // Replace req.query with the sanitizedQuery object
  req.query = sanitizedQuery;

  next();
}
function generatePageUrls(req: CustomRequest, res: Response, next: NextFunction): void {
  let page: string | number;
  let count: number;
  let results: Array<ApiDocument>;

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
      if (collectionQueries.queries[turnPathIntoModel(path)].includes(key)) {
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

export default (model: string): EndpointHandler => {
  return {
    find: [sanitizeQueryParams(model), checkSanitization, getAll, generatePageUrls, sendResponse],
    findById: []
  };
};
