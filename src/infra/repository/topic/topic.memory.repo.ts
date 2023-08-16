import { BadRequestException, Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { TopicRepoInterface } from './topic.repo.interface';
import { TopicEntity } from './topic.entity';
import * as dayjs from 'dayjs';
@Injectable()
export class TopicMemoryRepo implements TopicRepoInterface {
  store: TopicEntity[] = [];
  async save(entity: TopicEntity): Promise<TopicEntity> {
    entity.id = uuid();
    this.store.push(entity);
    return entity;
  }

  async findOneByIdOrThrow(topicId: string): Promise<TopicEntity> {
    const topic = this.store.find(
      (topic) => topic.id === topicId && !topic.deletedAt,
    );
    if (!topic) {
      throw new BadRequestException('토픽이 존재하지 않습니다.');
    }

    return topic;
  }

  async softRemove(entity: TopicEntity): Promise<TopicEntity> {
    this.store = this.store.map((topic) => {
      if (topic.id === entity.id) {
        topic.deletedAt = dayjs();
        return topic;
      }

      return topic;
    });

    return this.store.find((topic) => topic.id === entity.id);
  }
}
