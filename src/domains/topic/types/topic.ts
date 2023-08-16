import { Field, ObjectType } from '@nestjs/graphql';
import { TopicEntity } from '../../../infra/repository';

@ObjectType()
export class Topic {
  @Field(() => String)
  id: string;

  @Field(() => String, { description: '소식 내용' })
  content: string;

  @Field(() => String, { description: '소식 생성일' })
  createdAt: string;

  @Field(() => String, { description: '소식 수정일' })
  updatedAt: string;

  @Field(() => String, { description: '소식 삭제일', nullable: true })
  deletedAt: string;

  static from(data: TopicEntity): Topic {
    const topic = new Topic();
    topic.content = data.content;
    topic.id = data.id;
    topic.createdAt = data.createdAt.format('YYYY-MM-DD HH:mm:ss');
    topic.updatedAt = data.updatedAt.format('YYYY-MM-DD HH:mm:ss');
    topic.deletedAt = data.deletedAt?.format('YYYY-MM-DD HH:mm:ss');

    return topic;
  }
}
