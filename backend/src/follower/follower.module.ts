import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './follower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follower])],
  providers: [FollowerService],
  controllers: [FollowerController],
})
export class FollowerModule {}
