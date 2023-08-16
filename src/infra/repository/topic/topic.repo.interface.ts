import { TopicEntity } from './topic.entity';

export const TopicRepoInterfaceName = 'topicRepo';

export interface TopicRepoInterface {
  save(entity: TopicEntity): Promise<TopicEntity>;
  findOneByIdOrThrow(topicId: string): Promise<TopicEntity>;
  softRemove(entity: TopicEntity): Promise<TopicEntity>;
}
