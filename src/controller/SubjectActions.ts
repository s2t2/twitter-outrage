import { Context } from 'koa';
import { getRepository } from './utils';
import { Subject } from '../entity/Subject';

const createSubject = async (ctx: Context) => {
  console.log("CREATE SUBJECT...")
  const { subjectId } = ctx.request.body;

  console.log(subjectId)
  await getRepository(Subject).query(
    `
      INSERT INTO subject ("id")
        VALUES ($1)
    `,
    [subjectId]
  );

  ctx.body = { success: true };
};

export { createSubject };
