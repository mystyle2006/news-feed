import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TopicInput, Topic } from './types';
import { TopicService } from './topic.service';

@Resolver(() => Topic)
export class TopicResolver {
  constructor(private readonly service: TopicService) {}

  @Mutation(() => Topic, { description: '학교 페이지 생성' })
  async createTopic(@Args('input') input: TopicInput): Promise<Topic> {
    const result = await this.service.createTopic(input);
    return Topic.from(result);
  }
}
