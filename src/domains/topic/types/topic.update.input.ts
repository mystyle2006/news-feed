import { Field, InputType, PickType } from '@nestjs/graphql';
import { UpdateDto } from '../../common.dto';
import { TopicInput } from './topic.input';

@InputType()
export class TopicUpdate extends PickType(TopicInput, ['content'] as const) {}

@InputType()
export class TopicUpdateInput implements UpdateDto<string, TopicUpdate> {
  @Field(() => String, { description: '토픽 id' })
  id: string;

  @Field(() => TopicUpdate, { description: '수정할 내용' })
  update: TopicUpdate;
}
