import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class TopicInput {
  @Field(() => String, { description: '페이지 id' })
  pageId: string;

  @IsString()
  @MinLength(1)
  @Field(() => String, { description: '소식' })
  content: string;
}
