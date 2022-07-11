/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
import dotenv from 'dotenv';
import { Client, LogLevel } from '@notionhq/client';
import type { GetDatabaseResponse, QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints.js';

dotenv.config();

const client = new Client({
  auth: process.env['NOTION_ACCESS_TOKEN'] ?? 'secret_4IzpuU0Epg4tJaO4IaobXeu8LPNyLcc5obCnisRNu2c',
  logLevel: process.env['NODE_ENV'] !== 'production' ? LogLevel.DEBUG : LogLevel.WARN,
});

// const QA_DATABASE_ID = process.env['NOTION_QA_DB_KEY'] ?? 'bf44a03ccfd94bc1ba43ef3ee91be4ab';
// const QA_RESULT_DB_ID = process.env['NOTION_QA_RESULT_DB_KEY'] ?? '68cc9f3094834f0bad3a602b5b33b363';

interface queryDBProps extends QueryDatabaseParameters {
  type: 'list' | 'result';
}

/**
 * Notion 데이터베이스에서 페이지를 가져옵니다.
 *
 * @returns {Promise<Array<{ pageId: string, 항목 ID: string }>>}
 */
const queryDB = async ({ database_id, type }: queryDBProps) => {
  const pages = [];
  let cursor = undefined;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { results, next_cursor }: { results: any; next_cursor: any } = await client.databases.query({
      database_id,
    });
    pages.push(...results);

    if (!next_cursor) break;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cursor = next_cursor;
  }
  console.log('pages: ', pages);
  console.log(`${pages.length} `);

  return pages.map((page) => {
    if (type === 'list') {
      return {
        pageId: page.id,
        'Related to QA 테스트 결과 (property)': page.properties['Related to QA 테스트 결과 (property)'].relation,
        프론트: page.properties['프론트'].people,
        백엔드: page.properties['백엔드'].people,
        '항목 ID': page.properties['항목 ID'].title,
      };
    } else if (type === 'result') {
      return {
        pageId: page.id,
      };
    }
  });
};

const getQADB = async (databaseId: string): Promise<GetDatabaseResponse> => {
  const response = await client.databases.retrieve({
    database_id: databaseId,
  });

  return response;
};

const searchWorkspace = async (query: string, pageOrDB: 'page' | 'database') => {
  try {
    const search = await client.search({
      query,
      filter: {
        property: 'object',
        value: pageOrDB,
      },
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time',
      },
    });
    console.log(search);
  } catch (err) {
    console.error(err);
  }
};

const getUsers = async () => {
  const users = await client.users.list({});
  console.log('🚀 ~ file: notion.ts ~ line 25 ~ getUser ~ users', users);
};

export { queryDB, getQADB, searchWorkspace, getUsers };
