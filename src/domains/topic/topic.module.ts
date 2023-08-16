import { Module } from '@nestjs/common';
import { TopicResolver } from './topic.resolver';
import { PageRepoModule, TopicRepoModule } from '../../infra/repository';
import { TopicService } from './topic.service';

@Module({
  imports: [TopicRepoModule, PageRepoModule],
  providers: [TopicResolver, TopicService],
})
export class TopicModule {}
