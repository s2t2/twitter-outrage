import { Context } from 'koa';
import { getRepository } from './utils';
import { Rating } from '../entity/Rating';

const createRating = async (ctx: Context) => {
  console.log("CREATE RATING...")
  const {
    outrageous,
    tweetId,
    subjectId = 'default-subject-id',
  } = ctx.request.body;

  console.log([outrageous, tweetId, subjectId])

  await getRepository(Rating).query(
    `
      INSERT INTO rating ("outrageous", "tweetId", "subjectId")
        VALUES ($1, $2, $3)
    `,
    [outrageous, tweetId, subjectId]
  );

  ctx.body = { success: true };
};

export { createRating };
