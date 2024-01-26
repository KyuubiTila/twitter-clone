import { CommentFavorited } from 'src/comment-favorited/comment-favorited.entity';
import { CommentRetweet } from 'src/comment-retweet/comment-retweet.entity';
import { Comment } from 'src/comment/comment.entity';
import { TweetFavorited } from 'src/tweet-favorited/tweet-favorited.entity';
import { TweetRetweet } from 'src/tweet-retweet/tweet-retweet.entity';
import { Tweet } from 'src/tweet/tweet.entity';
import {
  BaseEntity,
  Unique,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Users')
@Unique(['username'])
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweet: Tweet[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];

  @OneToMany(
    () => CommentFavorited,
    (comment_favoritedBy) => comment_favoritedBy.user,
  )
  comment_favoritedBy: CommentFavorited[];

  @OneToMany(
    () => TweetFavorited,
    (tweet_favoritedBy) => tweet_favoritedBy.user,
  )
  tweet_favoritedBy: TweetFavorited[];

  @ManyToMany(() => Users, (user) => user.following)
  @JoinTable()
  followers: Users[];

  @OneToMany(() => TweetRetweet, (tweet_retweet) => tweet_retweet.user)
  tweet_retweets: TweetRetweet[];

  @OneToMany(() => CommentRetweet, (comment_retweet) => comment_retweet.user)
  comment_retweets: CommentRetweet[];

  @ManyToMany(() => Users, (user) => user.followers)
  following: Users[];
}
