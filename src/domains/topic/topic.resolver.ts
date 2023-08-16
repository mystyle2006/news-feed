import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { TopicInput, Topic } from './types';
import { TopicService } from './topic.service';
import { TopicUpdateInput } from './types/topic.update.input';

@Resolver(() => Topic)
export class TopicResolver {
  constructor(private readonly service: TopicService) {}

  @Mutation(() => Topic, { description: '새로운 토픽 생성' })
  async createTopic(@Args('input') input: TopicInput): Promise<Topic> {
    const result = await this.service.createTopic(input);
    return Topic.from(result);
  }

  @Mutation(() => Topic, { description: '토픽 수정' })
  async updateTopic(@Args('input') input: TopicUpdateInput): Promise<Topic> {
    const result = await this.service.updateTopic(input);
    return Topic.from(result);
  }

  @Mutation(() => Topic, { description: '토픽 삭제' })
  async deleteTopic(
    @Args('topicId', { type: () => ID }) topicId: string,
  ): Promise<Topic> {
    const result = await this.service.deleteTopic(topicId);
    return Topic.from(result);
  }
}
