import { Inject, Injectable } from '@nestjs/common';
import {
  PageRepoInterface,
  PageRepoInterfaceName,
  TopicEntity,
  TopicRepoInterface,
  TopicRepoInterfaceName,
} from '../../infra/repository';
import { TopicInput } from './types';

@Injectable()
export class TopicService {
  constructor(
    @Inject(TopicRepoInterfaceName)
    private readonly topicRepository: TopicRepoInterface,
    @Inject(PageRepoInterfaceName)
    private readonly pageRepository: PageRepoInterface,
  ) {}

  async createPage(input: TopicInput): Promise<TopicEntity> {
    const page = await this.pageRepository.findOneByIdOrThrow(input.pageId);

    const topicEntity = new TopicEntity();
    topicEntity.content = input.content;
    topicEntity.page = page;

    return await this.topicRepository.save(topicEntity);
  }
}