import express from 'express';
import type { Handler, Response } from 'express';
import { BASE_URL } from '@utils/helpers';
import api from './api';
// import getHandler, { jsonToHTML } from '@routes/middlewares';
import getHandler from '@routes/middlewares';
import type { EndpointHandler } from 'types';

const router = express.Router();

router.get('/', (_req, res: Response) => {
  // const data = {
  //   characters: `${BASE_URL}/characters`,
  //   races: `${BASE_URL}/races`,
  //   devil_fruits: `${BASE_URL}/devil_fruits`,
  //   haki_abilities: `${BASE_URL}/haki_abilities`
  // };
  // res.send(jsonToHTML(data));

  res.json({
    characters: `${BASE_URL}/characters`,
    races: `${BASE_URL}/races`,
    devil_fruits: `${BASE_URL}/devil_fruits`,
    haki_abilities: `${BASE_URL}/haki_abilities`
  });
});

api.forEach((endpoint) => {
  const handler: EndpointHandler = getHandler(endpoint.model);
  router.get(endpoint.path, handler[endpoint.handler as keyof Handler]);
});

export default router;
