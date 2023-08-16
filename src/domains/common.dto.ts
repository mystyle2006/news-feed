import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageResponse {
  @Field(() => String, { description: '응답 메시지' })
  message: string;
}
