import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { TopicRepoInterface } from './topic.repo.interface';
import { TopicEntity } from './topic.entity';
@Injectable()
export class TopicMemoryRepo implements TopicRepoInterface {
  store: TopicEntity[] = [];
  async save(entity: TopicEntity): Promise<TopicEntity> {
    entity.id = uuid();
    this.store.push(entity);
    return entity;
  }
}
