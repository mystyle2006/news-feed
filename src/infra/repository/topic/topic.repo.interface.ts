import { TopicEntity } from './topic.entity';
import { UpdateResult } from 'typeorm';

export const TopicRepoInterfaceName = 'topicRepo';

export interface TopicRepoInterface {
  save(entity: TopicEntity): Promise<TopicEntity>;
  findOneByIdOrThrow(topicId: string): Promise<TopicEntity>;
  softRemove(entity: TopicEntity): Promise<TopicEntity>;
  update(
    id: string,
    partialEntity: Partial<TopicEntity>,
  ): Promise<UpdateResult>;
}
