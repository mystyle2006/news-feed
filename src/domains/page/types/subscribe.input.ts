import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SubscribeInput {
  @Field(() => String, { description: '페이지 id' })
  pageId: string;

  @Field(() => String, {
    description: '학생 id (식별할 수 있는 임의의 학생 id를 넣어주세요.)',
  })
  studentId: string;
}
