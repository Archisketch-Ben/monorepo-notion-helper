/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import path from 'node:path';
import { createRequire } from 'node:module';
import express from 'express';
import compression from 'compression';
import ReactDOMServer from 'react-dom/server';
import qs from 'query-string';
import cors from 'cors';
import bodyParser from 'body-parser';

import { App } from '@notion-helper/app';

import { queryDB, getQADB, getUsers, searchWorkspace } from './services/notion.js';

const require = createRequire(import.meta.url);
const appRootDirectory = path.dirname(require.resolve('@notion-helper/app/package.json'));
const appBundleDirectory = path.join(appRootDirectory, 'dist/umd');

export function createHttpServer(): express.Express {
  const app = express();

  app.use(compression());
  app.use(express.static(appBundleDirectory));
  const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
  };

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors(corsOptions));
  app.get('/server', ssrHandler);

  app.post('/notion/database/query', async (req: express.Request, res: express.Response) => {
    console.log(req.body);
    const database_id = req.body['database_id'] ?? '';
    const type = req.body['type'] ?? 'list';

    try {
      const dbQueryResponse = await queryDB({ database_id, type });
      res.json(dbQueryResponse);
    } catch (err) {
      console.error(err);
    }
  });
  app.get('/notion/:id', async (req: express.Request, res: express.Response) => {
    const database_id = req.params['id'] ?? '';

    const QADB = await getQADB(database_id);

    res.json(QADB);
  });
  app.get('/notion/users', async (_req: express.Request, res: express.Response) => {
    const users = await getUsers();

    res.json(users);
  });
  app.get('/notion/search/:query', async (req: express.Request, res: express.Response) => {
    const queryData = qs.parseUrl(req.url).query;

    const query = queryData['query'] as string;
    const pageOrDB = queryData['type'] as 'page' | 'database';
    const users = await searchWorkspace(query, pageOrDB);

    res.json(users);
  });

  return app;
}

function ssrHandler(_req: express.Request, res: express.Response) {
  res.end(
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="Description" content="Monorepo example server-side renderer app">
    <title>Monorepo Example</title>
    <link href="main.css" rel="stylesheet">
</head>
<body>
    <div id="SITE_MAIN" data-ssr>${ReactDOMServer.renderToString(<App text="Hello World (SSR)" />)}</div>
    <script type="text/javascript" src="main.js"></script>
</body>
</html>`
  );
}
