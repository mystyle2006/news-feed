import { Injectable } from '@nestjs/common';
import { TopicRepoInterface } from './topic.repo.interface';
import { TopicEntity } from './topic.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TopicRepo
  extends Repository<TopicEntity>
  implements TopicRepoInterface
{
  constructor(private dataSource: DataSource) {
    super(TopicEntity, dataSource.createEntityManager());
  }
}
