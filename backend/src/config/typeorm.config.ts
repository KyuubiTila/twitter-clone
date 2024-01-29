import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { Users } from 'src/auth/users.entity';
import { CommentFavorited } from 'src/comment-favorited/comment-favorited.entity';
import { CommentRetweet } from 'src/comment-retweet/comment-retweet.entity';
import { Comment } from 'src/comment/comment.entity';
import { Profile } from 'src/profile/profile.entity';
import { TweetFavorited } from 'src/tweet-favorited/tweet-favorited.entity';
import { TweetRetweet } from 'src/tweet-retweet/tweet-retweet.entity';
import { Tweet } from 'src/tweet/tweet.entity';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [
    Users,
    Tweet,
    Comment,
    CommentFavorited,
    TweetFavorited,
    TweetRetweet,
    CommentRetweet,
    Profile,
  ],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};
