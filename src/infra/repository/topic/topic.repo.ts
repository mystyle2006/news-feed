import { BadRequestException, Injectable } from '@nestjs/common';
import { TopicRepoInterface } from './topic.repo.interface';
import { TopicEntity } from './topic.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TopicRepo
  extends Repository<TopicEntity>
  implements TopicRepoInterface
{
  constructor(private dataSource: DataSource) {
    super(TopicEntity, dataSource.createEntityManager());
  }

  async findOneByIdOrThrow(topicId: string): Promise<TopicEntity> {
    const topicEntity = await this.findOne({
      where: {
        id: topicId,
      },
    });
    if (!topicEntity) {
      throw new BadRequestException('토픽이 존재하지 않습니다.');
    }

    return topicEntity;
  }

  async findByPageId(pageId: string): Promise<TopicEntity[]> {
    return await this.find({
      where: {
        page: {
          id: pageId,
        },
      },
      order: { createdAt: 'desc' },
    });
  }
}
