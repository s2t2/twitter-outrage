import { Context } from 'koa';
import { getRepository } from './utils';
import sampleSize = require('lodash.samplesize');
import { Tweet } from '../entity/Tweet';

const getTweets = async (ctx: Context) => {
  const tweets = await getRepository(Tweet).find({
    where: { active: true },
    take: 1000,
    cache: 3600000,
  });

  console.log("TWEETS RESPONSE", tweets.length)

  ctx.body = sampleSize(tweets, 30);
};

export { getTweets };
