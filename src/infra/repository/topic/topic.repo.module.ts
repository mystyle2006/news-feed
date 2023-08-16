import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicEntity } from './topic.entity';
import { TopicRepoInterfaceName } from './topic.repo.interface';
import { TopicRepo } from './topic.repo';

@Module({
  imports: [TypeOrmModule.forFeature([TopicEntity])],
  providers: [
    {
      provide: TopicRepoInterfaceName,
      useClass: TopicRepo,
    },
  ],
  exports: [TopicRepoInterfaceName],
})
export class TopicRepoModule {}
