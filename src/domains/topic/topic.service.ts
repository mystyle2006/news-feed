import { Inject, Injectable } from '@nestjs/common';
import {
  PageRepoInterface,
  PageRepoInterfaceName,
  TopicEntity,
  TopicRepoInterface,
  TopicRepoInterfaceName,
} from '../../infra/repository';
import { TopicInput } from './types';
import { TopicUpdateInput } from './types/topic.update.input';

@Injectable()
export class TopicService {
  constructor(
    @Inject(TopicRepoInterfaceName)
    private readonly topicRepository: TopicRepoInterface,
    @Inject(PageRepoInterfaceName)
    private readonly pageRepository: PageRepoInterface,
  ) {}

  async updateTopic(input: TopicUpdateInput): Promise<TopicEntity> {
    const entity = await this.topicRepository.findOneByIdOrThrow(input.id);
    entity.content = input.update.content;

    await this.topicRepository.update(input.id, entity);
    return entity;
  }

  async createTopic(input: TopicInput): Promise<TopicEntity> {
    const page = await this.pageRepository.findOneByIdOrThrow(input.pageId);

    const topicEntity = new TopicEntity();
    topicEntity.content = input.content;
    topicEntity.page = page;

    return await this.topicRepository.save(topicEntity);
  }

  async deleteTopic(topicId: string): Promise<TopicEntity> {
    const entity = await this.topicRepository.findOneByIdOrThrow(topicId);
    return await this.topicRepository.softRemove(entity);
  }
}
