import { Module } from '@nestjs/common';
import { TopicResolver } from './topic.resolver';
import {
  PageRepoModule,
  SubscribeRepoModule,
  TopicRepoModule,
} from '../../infra/repository';
import { TopicService } from './topic.service';

@Module({
  imports: [TopicRepoModule, PageRepoModule, SubscribeRepoModule],
  providers: [TopicResolver, TopicService],
})
export class TopicModule {}
